// @ts-ignore - path alias used for challenge demonstration
import type { User } from "@/types";

type CustomUser = {
  name: string;
  age: number;
};

export function solve_06_path_mapping_custom_types(): string {
  const user: CustomUser = {
    name: "Aryan",
    age: 20
  };

  return `${user.name} ${user.age}`;
}