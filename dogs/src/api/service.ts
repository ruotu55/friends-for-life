import { Adoption, Dog, Drive, User } from "../utils/interfaces";
import { Repository } from "./repository";
import { DatabaseTools } from "../utils/database-tools";

const VACCINATION_CONSTANT: number = 6;

export class Service {

    static async getDrives(): Promise<Drive[]> {
        return await Repository.getDrives();
    }

    static async upsertDrive(drive: Drive): Promise<Drive> {
        return await Repository.upsertDrive(drive);
    }

    static async deleteDrive(id: number): Promise<number> {
        return await Repository.deleteDrive(id);
    }

    static async getDogs(options?: Partial<Dog>): Promise<Dog[]> {
        return await Repository.getDogs(options);
    }

    static async getDogsToVaccinate(): Promise<Dog[]> {
        const currentDate: Date = new Date();
        const vaccinationDate: Date = new Date(currentDate);
        vaccinationDate.setMonth(currentDate.getMonth() - VACCINATION_CONSTANT);
        return await DatabaseTools.getDogsToVaccinate(vaccinationDate);
    }

    static async upsertDog(dog: Dog): Promise<Dog> {
        return await Repository.upsertDog(dog);
    }

    static async adoptDog(dogId: number): Promise<boolean> {
        await Repository.deleteAdoptionByDogId(dogId);
        await Repository.deleteDriveByDogId(dogId);
        return !!await Repository.deleteDogById(dogId);
    }

    static async getUsers(): Promise<User[]> {
        return await Repository.getUsers();
    }

    static async getUserById(id: number): Promise<User> {
        return await Repository.getUserById(id);
    }

    static async upsertUser(user: User): Promise<User> {
        return await Repository.upsertUser(user);
    }

    static async login(username: string, password: string): Promise<User> {
        return await Repository.login(username, password);
    }

    static async upsertAdoption(adoption: Adoption): Promise<boolean> {
        return !!await Repository.upsertAdoption(adoption);
    }

    static async getPendingAdoptionApplications(): Promise<Adoption[]> {
        return await Repository.getPendingAdoptionApplications();
    }

    static async deleteAdoption(id: number): Promise<number> {
        return await Repository.deleteAdoptionById(id);
    }

    static async claimDrive(id: number, userId: number): Promise<boolean> {
        return !!await Repository.upsertDrive({ id, userId });
    }
}
