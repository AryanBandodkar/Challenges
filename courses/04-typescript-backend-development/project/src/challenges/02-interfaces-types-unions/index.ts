interface User {
  name: string;
  age: number;
}

type Status = "active" | "inactive";

type UserDetails = [string, number];

type UserData = User | UserDetails;

declare enum Role {
  Admin = "Admin",
  User = "User"
}

export function solve_02_interfaces_types_unions(): string {
  const user: User = {
    name: "Aryan",
    age: 20
  };

  const status: Status = "active";

  const role: Role = "User" as Role;

  const details: UserDetails = [user.name, user.age];

  const data: UserData = user;

  const displayName =
    Array.isArray(data)
      ? data[0]
      : data.name;

  return `${displayName} ${user.age} ${status} ${role} ${details[0]} ${details[1]}`;
}