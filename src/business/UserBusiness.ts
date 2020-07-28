import { UserDatabase } from "../data/UserDatabase";
import { IdManager } from "../services/IdManager";
import { User } from "../model/User";
import { HashManager } from "../services/HashManager";
import { DataAlreadyInUser } from "../errors/DataAlreadyInUser";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idManager: IdManager,
    private hashManager: HashManager
  ) { }

  public async register(email: string, password: string): Promise<User> {
    const id = this.idManager.generateId()
    const hash = await this.hashManager.generateHash(password)

    const user = await this.userDatabase.getUserByEmail(email)
    if (user) {
      throw new DataAlreadyInUser("Email já cadastrado")
    }

    const newUser = new User(id, email, hash)

    await this.userDatabase.register(newUser)

    return newUser
  }

  public async getUserById(id:string): Promise<User | undefined>{
    const user = await this.userDatabase.getUserById(id)

    return user
  }
}