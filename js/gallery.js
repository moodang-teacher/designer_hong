import PhotoSwipeLightbox from "https://cdn.jsdelivr.net/npm/photoswipe@5.2.2/dist/photoswipe-lightbox.esm.js";

function initializeGallery(galleryId) {
  const lightbox = new PhotoSwipeLightbox({
    gallery: galleryId,
    children: "a",
    pswpModule: () =>
      import(
        "https://cdn.jsdelivr.net/npm/photoswipe@5.2.2/dist/photoswipe.esm.js"
      ),
  });
  lightbox.init();
}

// 갤러리 초기화
initializeGallery("#my-gallery");
// initializeGallery("#my-gallery2");
