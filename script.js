const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');

let currentIndex = 0;
let zoom = 1;
let currentGallery = [];

// Define nested galleries for each category
const nestedGalleries = {
  forest: [
    "https://thumbs.dreamstime.com/b/forest-path-v3-13197528.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78uQ3RVjEsp24OPNDUHmZ5hWq4MY3dAXQYA&s",
    "https://www.keralatourism.org/images/enchanting_kerala/large/bonacaud_thiruvananthapuram20221107144733_1242_1.jpg",
    "https://t4.ftcdn.net/jpg/02/55/17/43/360_F_255174366_ojDuATz84e5h7lIlxh2moUJa9Kpd5wKk.jpg",
    "https://s7ap1.scene7.com/is/image/incredibleindia/tadoba-forest-mumbai-maharashtra-4-attr-hero?qlt=82&ts=1742193902522",
    "https://junglecampsindia.com/wp-content/uploads/2024/10/JCI-blog-images-9.webp",
  ],
  beach: [
    "https://media.istockphoto.com/id/610041376/photo/beautiful-sunrise-over-the-sea.jpg?s=612x612&w=0&k=20&c=R3Tcc6HKc1ixPrBc7qXvXFCicm8jLMMlT99MfmchLNA=",
    "https://img.freepik.com/free-photo/beautiful_1203-2633.jpg?semt=ais_hybrid&w=740&q=80",
    "https://lp-cms-production.imgix.net/2024-12/GettyRF178407725.jpg?auto=format,compress&q=72&fit=crop",
    "https://upload.wikimedia.org/wikipedia/commons/7/73/Beach_at_Fort_Lauderdale.jpg",
    "https://www.keralatourism.org/_next/image/?url=http%3A%2F%2F127.0.0.1%2Fktadmin%2Fimg%2Fpages%2Fmobile%2Fbekal-beach-1734522785_33f0fe9fd8c81f172b2e.webp&w=3840&q=75"
  ],
  mountain: [
    "https://media.istockphoto.com/id/1453838542/photo/last-light-on-mount-sneffels.jpg?s=612x612&w=0&k=20&c=IBOZYpAjhV5hFEL8yKYmY2ZCyCaGEOrXR5VZI13NMRI=",
    "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?cs=srgb&dl=pexels-pixabay-417173.jpg&fm=jpg",
    "https://cdn.magicdecor.in/com/2023/02/29234001/image-1682163782-1982.jpg",
    "https://www.muchbetteradventures.com/magazine/content/images/2024/04/mount-everest-at-sunset.jpg",
   "https://t3.ftcdn.net/jpg/01/80/83/76/360_F_180837604_UyJZNTHPluIJNQJjmTkCpE4XLJ03Zott.jpg"

  ],
  river: [
    "https://thumbs.dreamstime.com/b/mountain-river-forest-north-cascades-national-park-washington-usa-73004270.jpg",
    "https://media.istockphoto.com/id/154931594/photo/nez-perce-creek-in-yellowstone-national-park-at-sunset.jpg?s=612x612&w=0&k=20&c=U6o_x_XXY5YWcowPpci3HlHDzimjm2jUwKMnZTnmpz4=",
"https://images.unsplash.com/photo-1568078368899-227e4e7d4682?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cml2ZXJzfGVufDB8fDB8fHww",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmxQXPTW5TmQZ9wZ3B7-yr6MboBMuJN6mgDA&s",
"https://previews.123rf.com/images/porojnicu/porojnicu1108/porojnicu110800037/10289362-mountain-river-in-a-forest-of-trees.jpg"
  ],
  desert: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnJSaXq8_Noflw25eu3JCzvLUkc_RUNvPdVg&s",
    "https://t4.ftcdn.net/jpg/02/78/52/07/360_F_278520748_G9sRQdSValj67Hihmt4r3ji6SLRT3ViA.jpg",
"https://media.istockphoto.com/id/821028586/photo/camel-in-liwa-desert.jpg?s=612x612&w=0&k=20&c=muOku7jEtWwDg1sTMIdC9s6ZpnKsWcgxRkEmgp-eIis=",
"https://images.unsplash.com/photo-1527261460248-b0abfd14c0da?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVzZXJ0JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
"https://th-thumbnailer.cdn-si-edu.com/h-bun2rAGQCTzVJvCy-fJPZB-wE=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/f2/94/f294516b-db3d-4f7b-9a60-ca3cd5f3d9b2/fbby1h_1.jpg"
  ],
  trees: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDnq02bFjMkr7hPIZ0hDs67LPwDbStjZwPw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJhrNzHoXKgCOCdvy3fFkxiQmI53azVGqWw&s",
"https://thumbs.dreamstime.com/b/colorful-autumn-trees-park-60446002.jpg",
"https://hips.hearstapps.com/hmg-prod/images/malus-halliana-koehne-flower-royalty-free-image-1750862703.pjpeg?crop=0.671xw:1.00xh;0.165xw,0&resize=640:*",
"https://www.shutterstock.com/image-photo/big-autumn-oak-green-grass-600nw-86273293.jpg"
  ]
};

// Open lightbox
galleryItems.forEach(item => {
  const btn = item.querySelector('.view-btn');
  btn.addEventListener('click', () => {
    const category = item.dataset.category;
    currentGallery = nestedGalleries[category];
    currentIndex = 0;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.style.display = 'flex';
  lightboxImg.src = currentGallery[currentIndex];
  zoom = 1;
  lightboxImg.style.transform = `scale(${zoom})`;
}

// Close lightbox
closeBtn.addEventListener('click', () => lightbox.style.display='none');

// Navigation
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  lightboxImg.src = currentGallery[currentIndex];
  zoom = 1;
  lightboxImg.style.transform = `scale(${zoom})`;
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  lightboxImg.src = currentGallery[currentIndex];
  zoom = 1;
  lightboxImg.style.transform = `scale(${zoom})`;
});

// Zoom
zoomInBtn.addEventListener('click', () => {
  zoom += 0.2;
  lightboxImg.style.transform = `scale(${zoom})`;
});

zoomOutBtn.addEventListener('click', () => {
  zoom = Math.max(1, zoom - 0.2);
  lightboxImg.style.transform = `scale(${zoom})`;
});
