export type CreateRequest = {
  text: string;
};

export default async function create(data: CreateRequest) {
  try {
    const res = await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const json: CreateRequest = await res.json();
    return json;
  } catch (error) {
    throw error as Error;
  }
}
