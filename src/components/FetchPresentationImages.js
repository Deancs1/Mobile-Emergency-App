export const fetchPresentationImages = async (procedure) => {
  // Load all images from both "cpr" and "heimlich" directories
  const imageContext = import.meta.glob("../images/*/*.{png,jpg,jpeg,svg}");

  const imageFiles = [];

  // Loop through the matched images
  for (const path in imageContext) {
    const imageModule = await imageContext[path](); // Dynamically import the image

    // Extract the folder name (procedure) from the path
    const folderName = path.split("/")[2];

    // Only add images that belong to the relevant procedure
    if (folderName === procedure.toLowerCase()) {
      imageFiles.push({
        src: imageModule.default, // The image URL
        alt: path
          .split("/")
          .pop()
          .replace(/\.\w+$/, ""), // Extract file name for alt text
      });
    }
  }

  return imageFiles;
};
