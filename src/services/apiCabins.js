import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // https://hpululfofqdyayqrxrzd.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  // 1 create cabins
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Created");
  }

  // 2  upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    const { data } = await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Image could not be uploaded and new cabin not be created");
  }

  return data;
}

export async function deleteCabins(id) {
  console.log(id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  console.log("data", data);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Deleted");
  }
  return data;
}
