interface User {
  id: number;
  name: string;
}

class UserRepository {
  private readonly users: User[] = [
    { id: 1, name: 'Aryan' },
    { id: 2, name: 'Tim' }
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  save(user: User): User {
    this.users.push(user);
    return user;
  }
}

class UserService {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  getUser(id: number): User | undefined {
    return this.repository.findOne(id);
  }

  getUsers(): User[] {
    return this.repository.findAll();
  }

  createUser(user: User): User {
    return this.repository.save(user);
  }
}

export function solve_06_typeorm_prisma_repository_pattern(): string {
  const repository = new UserRepository();
  const service = new UserService(repository);

  const user = service.getUser(1);

  return user ? user.name : 'User not found';
}