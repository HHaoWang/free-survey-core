export default function removeUlidDefaultFactoryUsing() {
  return {
    name: "remove-ulid-default-factory-using", // 此名称将出现在警告和错误中
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === "chunk") {
          chunk.code = chunk.code.replace(/factory\(\);?\n?/g, "");
        }
      }
    },
  };
}
