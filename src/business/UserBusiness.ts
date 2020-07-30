import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { User } from "../model/User";
import { HashManager } from "../services/HashManager";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idManager: IdManager,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) { }

  public async register(email: string, password: string): Promise<string> {
    const user = await this.userDatabase.getUserByEmail(email)
    if (user) {
      throw new DataAlreadyInUser("Email já cadastrado")
    }

    const id = this.idManager.generateId()
    const hash = await this.hashManager.generateHash(password);

    const newUser = new User(id, email, hash)

    await this.userDatabase.register(newUser)

    const token = this.tokenManager.generateToken({
      id: newUser.getId(),
      email: newUser.getEmail()
    })

    return token
  }

  public async getUserById(token: string): Promise<User | undefined> {
    const userData = this.tokenManager.retrieveDataFromToken(token);
    const user = await this.userDatabase.getUserById(userData.id);

    return user
  }
}