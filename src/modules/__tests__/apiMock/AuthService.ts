export const example = async () => {
  return (await import("../data/data.json")).default;
}

export const updateUser = async (payload) => {  
  return "User updated.";
}
