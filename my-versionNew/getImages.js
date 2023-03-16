const Images = [
  { id: 1, urls: ['./IMG/diffIMG/PL.png','./IMG/diffIMG/PR.png'] },
  { id: 2, urls: ['./IMG/diffIMG/PL2.png','./IMG/diffIMG/PR2.png'] },
  { id: 3, urls: ['./IMG/diffIMG/star_03.png','./IMG/diffIMG/star_04.png'] },
  { id: 4, urls: ['./IMG/diffIMG/Pn1.png','./IMG/diffIMG/Pn2.png'] },
];
const config = { time: 50, num: 2 };

const getImages = () => {
  let image = [];
  let usedImage = JSON.parse(localStorage.getItem("Images")) || [];
  let currentimage;
  let num = config.num;
  let i = 0;  // 
  while (i != num) {
    var compareflag = true;

    while (compareflag) {
      var index = Math.floor(Math.random() * Images.length);
      currentimage = Images[index];

      if (usedImage.length == Images.length) {
        localStorage.removeItem("Images");
        console.log("remove");
        usedImage = [];
        usedImage.push(currentimage.id);
        localStorage.setItem("Images", JSON.stringify(usedImage));
        console.log("add now");
        compareflag = false;
      } else {
        if (usedImage.includes(currentimage.id)) {
          index = Math.floor(Math.random() * Images.length);
          currentimage = Images[index];
        } else {
          usedImage.push(currentimage.id);
          localStorage.setItem("Images", JSON.stringify(usedImage));
          compareflag = false;
        }
      }
    }

    image.push(currentimage.urls);
    i++;
    }
    
    return image;
};

