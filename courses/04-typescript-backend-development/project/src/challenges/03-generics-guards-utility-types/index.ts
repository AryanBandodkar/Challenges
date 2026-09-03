interface User {
  name: string;
  age: number;
}

function identity<T>(value: T): T {
  return value;
}

function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "name" in value && "age" in value;
}

export function solve_03_generics_guards_utility_types(): string {
  const user: User = {
    name: "Aryan",
    age: 20
  };

  const partialUser: Partial<User> = {
    name: "Aryan"
  };

  const pickedUser: Pick<User, "name"> = {
    name: "Aryan"
  };

  identity<User>(user);
  isUser(user);

  return `${partialUser.name} ${pickedUser.name}`;
}