import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"



class UsersService
{
    private usersRepository: Repository<User>;

    constructor()
    {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async findByEmail(email: string)
    {
        const userExists = await this.usersRepository.findOne({
            email
        });

        //se existir, retorna usuario
        if(userExists)
        {
            return userExists;
        }
    }

    async create(email: string)
    {
        
        //Verificar se usuário existe

        const userExists = await this.usersRepository.findOne({
            email
        });

        //se existir, retorna usuario
        if(userExists)
        {
            return userExists;
        }

        const user = this.usersRepository.create({
            email,
        });

        await this.usersRepository.save(user);

        return user;
    }
}

export { UsersService }