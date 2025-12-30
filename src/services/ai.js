export const sendToAI = async (message) => {
  // حالياً رد تجريبي (لاحقاً نربطه بـ OpenAI)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "كلامك جيد، لكن أعطني سبباً مقنعاً يجعلني أختارك دون منافسيك."
      );
    }, 1000);
  });
};