interface User {
  name: string;
  age: number;
}

type Status = "active" | "inactive";

type UserDetails = [string, number];

enum Role {
  Admin,
  User
}

export function solve_02_interfaces_types_unions(): string {
  const user: User = {
    name: "Aryan",
    age: 20
  };

  const status: Status = "active";
  const role: Role = Role.User;

  const details: UserDetails = ["Aryan", 20];

  const data: User | UserDetails = user;

  return `${user.name} ${user.age} ${status} ${role} ${details[0]} ${details[1]} ${"name" in data ? data.name : data[0]}`;
}