const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());

let recipes = [
  {
    id: 1,
    name: "ข้าวผัดกระเพราหมูสับ",
    image:
      "https://www.unileverfoodsolutions.co.th/dam/global-ufs/mcos/SEA/calcmenu/recipes/TH-recipes/chicken-&-other-poultry-dishes/%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%94%E0%B8%B2%E0%B8%A7/%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%94%E0%B8%B2%E0%B8%A7_header.jpg",
    category: "อาหารไทย",
    ingredients: [
      "หมู 2 ขีด",
      "กระเพรา 2 ชิ้น",
      "น้ำตาลทราย 1 ช้อนชา",
      "ซีอิ๊วดำหวาน 1 ช้อนชา",
      "พริกไทยป่น",
    ],
    steps: [
      "ใส่น้ำมันในกระทะร้อน",
      "ผัดพริกและกระเทียมในน้ำมันจนขึ้นสีอ่อน ๆ",
      "ใส่เนื้อสับและผัดต่อจนสุก 75%",
      "ใส่เครื่องปรุงรสแล้วผัดให้เข้ากัน",
      "ใส่ใบกะเพราท้ายสุด คลุกให้เข้ากันดีแล้วปิดเตาทันที",
      "ทอดไข่ดาวโดยเลือกความสุกตามใจชอบ",
      "นำข้าวสวยใส่จาน ราดด้วยผัดกะเพรา แล้วตบท้ายด้วยไข่ดาวที่เตรียมไว้",
      "โรยหน้าด้วยลูกผักชีคั่วและยี่หร่าป่น",
    ],
    prepTime: "30",
    cookTime: "20",
    totalTime: "50",
    servings: "1-2",
    tools: ["กระทะ", "ตะหลิว", "ครก"],
  },
  {
    id: 2,
    name: "ต้มยำกุ้ง",
    image:
      "https://th.bing.com/th/id/R.281e10312d812cdf403d9415e790fe22?rik=sYvIjocQ6aXDXw&riu=http%3a%2f%2f4.bp.blogspot.com%2f-pPuHYww9J-s%2fVE49cVxb3aI%2fAAAAAAAAAu0%2fdp0GOyCss-M%2fs1600%2fSa-Mun-Pai-4_0.jpg&ehk=VtZsLoBXcPhtEbKzfl905YKJpxQ1WHW2cqFDtmVqIVY%3d&risl=&pid=ImgRaw&r=0",
    category: "อาหารไทย",
    ingredients: ["กุ้ง 5 ตัว", "ใบมะกรูด 5 ใบ"],
  },
  {
    id: 3,
    name: "ส้มตำ",
    image: "https://jokkerch.files.wordpress.com/2015/09/m6_01.jpg?w=600&h=356",
    category: "อาหารอีสาน",
    ingredients: [
      "มะละกอ 1 ลูก",
      "ถั่วฝักยาว 3 ต้น",
      "น้ำปลา 2 ช้อนโต๊ะ",
      "น้ำตาลปี๊บ 1 ช้อนโต๊ะ",
    ],
  },
  {
    id: 4,
    name: "ข้าวผัดหมู",
    image:
      "https://th.bing.com/th/id/R.a0ab9bc0230da88dacc7d8cc954941a4?rik=2nkg1KcpPrA0ww&pid=ImgRaw&r=0",
    category: "อาหารไทย",
    ingredients: ["น้ำมันพืช", "หมู 2 ชิ้น", "ไข่ไก่ 1 ฟอง", "ข้าวสวย"],
    prepTime: "20",
    cookTime: "35",
    totalTime: "55",
    servings: "2-3",
    steps: [
      "ใส่น้ำมันลงในกระทะ ใส่กระเทียมสับลงไปเจียวจนหอม ใส่หมูลงไปผัดพอสุก",
      "ตอกไข่ไก่ลงไปยีพอแตก ตามด้วยคะน้า ผัดพอสุก ใส่ข้าวสวยลงไป",
      "ปรุงรสด้วยน้ำตาลทราย ซีอิ๊วขาว และซอสปรุงรส อาจเพิ่มสีสันด้วยซีอิ๊วดำ",
      "ใส่มะเขือเทศกับหอมใหญ่ ผัดคลุกเคล้าพอเข้ากัน ใส่ต้นหอม ผัดพอเข้ากัน ตักเสิร์ฟกับมะนาวหั่นซีก แตงกวา และพริกน้ำปลา",
    ],
    tools: ["กระทะ", "ตะหลิว"],
  },
  {
    id: 5,
    name: "ข้าวคอหมูย่าง",
    image: "https://i.ytimg.com/vi/IOMJUFRDJdM/maxresdefault.jpg",
    category: "อาหารไทย",
    ingredients: [
      "หมู 2 ชิ้น",
      "น้ำมันหอย",
      "เกลือ 2 ช้อนชา",
      "น้ำผึ้ง 2 ช้อนโต๊ะ",
      "นมข้นจืด ตรามะลิ โปรเฟสชั่นแนล  1/4 ถ้วย",
      "3 เกลอ 1 ช้อนโต๊ะ (รากผักชี / กระเทียม / พริกไทย)",
      "ซีอิ๊วขาว 3 ช้อนโต๊ะ",
    ],
    prepTime: "45",
    cookTime: "40",
    totalTime: "85",
    servings: "4",
    steps: [
      "เตรียมคอหมู ล้างทำความสะอาดให้เรียบร้อย ถ้ามีมันเยอะเกินไป ให้ตัดแต่งเลาะมันออกแต่พอดี",
      "โขลกพริกไทยให้ละเอียด เมื่อละเอียดดีแล้ว โขลกกระเทียมตามลงไปให้พอหยาบๆ แล้วพักไว้",
      "ผสมเครื่องหมักเข้าด้วยกัน นำน้ำตาลปี๊ป ซอสหอยนางรม ซอสปรุงรสฝาเขียว น้ำปลา มาผสมกัน แล้วนำส่วนผสมที่โขลกไว้มาคลุกเคล้าเข้าด้วยกัน จนน้ำตาลปี๊ปละลายดี",
      "นำคอหมูลงไปหมักคลุกเคล้าให้เข้ากัน ปิดด้วยพลาสติกแรปแช่ตู้เย็นไว้ข้ามคืน (ถ้าต้องการหมักเร่งด่วนใช้ส้อมจิ้ม แล้วสามารถหมักทิ้งไว้ในตู้เย็น 30 นาที-1 ชม.ได้)",
      "ก่อเตาไฟ แล้วนำคอหมูไปย่าง ในไฟเตาถ่านระดับอ่อน ย่างต่อไปจนเสร็จ",
      "หั่นคอหมูย่างแนวเฉียง ให้มีความหนาขนาดพอดี แล้วจัดเสิร์ฟคู่กับน้ำจิ้ม",
    ],
    tools: ["กระทะ", "ตะหลิว", "เตาย่าง", "หม้อ"],
  },
  {
    id: 6,
    name: "ข้าวหมูทอดกระเทียม",
    image:
      "https://i.ytimg.com/vi/DnLK3B4fwR8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBz8X-VnyRg4KPHFc0O6C4i1IWGjQ",
    category: "อาหารไทย",
    ingredients: [
      "หมู 3 ขีด",
      "กระเทียมสับ 3 ช้อนโต๊ะ",
      "น้ำมัน 1 ถ้วยตวง",
      "สามเกลอ 1 ช้อนโต๊ะ (รากผักชี, กระเทียม, พริกไทย)",
      "นมสด 1 ขวด(2 ช้อนโต๊ะ)",
      "ซอยหอยนางรม 2 ช้อนโต๊ะ",
      "ซอสปรุงรส 1 ช้อนโต๊ะ",
      "น้ำปลา 1 ช้อนโต๊ะ",
      "แป้งมัน 2 ช้อนโต๊ะ",
      "ซีอิ๊วดำ 1 ช้อนโต๊ะ ",
    ],
    prepTime: "10",
    cookTime: "25",
    totalTime: "35",
    servings: "2-3",
    steps: [
      "ใส่น้ำมันพืชลงในกระทะ ใช้ไฟปานกลาง พอน้ำมันร้อนใส่เนื้อหมูลงไปผัดจนหมูใกล้สุก ",
      "ปรุงรสด้วยเครื่องปรุงรสทั้งหมด ชิมรสชาติตามชอบ (ถ้าได้แล้วก็จบเลย ถ้าอยากได้เปียกๆก็ใส่น้ำเพิ่มลงไปได้)",
      "ใส่กระเทียมเจียวสำเร็จรูปลงไปคลุกเคล้าให้เข้ากัน ตักใส่จาน",
      "โรยกระเทียมเจียวอีกเล็กน้อยให้สวยงาม พร้อมเสิร์ฟ",
    ],
    tools: ["กระทะ", "ตะหลิว", "หม้อทอด"],
  },
  {
    id: 7,
    name: "ข้าวหมูสามชั้น",
    image: "https://img.kapook.com/u/2015/surauch/cook2/moo1_1.jpg",
    category: "อาหารไทย",
    ingredients: [
      "หมูสามชั้น 1 ชิ้น(200 กรัม)",
      "ซอสเทริยากิ ตราเอโร่ 50 มิลลิลิตร",
      "ไข่ไก่ 1 ฟอง",
      "ข้าวสวย 1 ถ้วยตวง",
      "ต้นหอมซอย",
    ],
  },
];
// ข้อมูลส่วนผสม (My Ingredient)
let ingredients = [
  {
    id: 1,
    name: "ไก่",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://chefsmandala.com/wp-content/uploads/2018/03/Chicken-Breast-600x338.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 2,
    name: "หมู",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://i0.wp.com/maidencreekbeef.com/wp-content/uploads/2022/06/raw-pork-chops-.jpeg?fit=612%2C408&ssl=1",
    favorite: false,
    allergies: false,
  },
  {
    id: 3,
    name: "เนื้อ",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://cdn-ikpgpdn.nitrocdn.com/tLoRzupMkqhbSMgOMvnedXGeHBZqobJG/assets/images/optimized/rev-286ae25/marew.net/wp-content/uploads/2024/03/%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%99%E0%B8%84%E0%B8%AD%E0%B8%A7%E0%B8%B1%E0%B8%A7Chuck-1024x1024.webp",
    favorite: false,
    allergies: false,
  },
  {
    id: 4,
    name: "ไข่ไก่",
    quantity: 0,
    weight: "ฟอง",
    image:
      "https://kidseatincolor.com/wp-content/uploads/2022/02/eggs-e1648216369366.jpeg",
    favorite: false,
    allergies: false,
  },
  {
    id: 5,
    name: "กระเพรา",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://www.sooktookkum.com/wp-content/uploads/2021/03/%E0%B9%83%E0%B8%9A%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2.png",
    favorite: false,
    allergies: false,
  },
  {
    id: 6,
    name: "กุ้ง",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://thumb.ac-illust.com/ea/ea11640e45593d02e01d38debca5ac35_t.jpeg",
    favorite: false,
    allergies: false,
  },
  {
    id: 7,
    name: "ใบมะกรูด",
    quantity: 0,
    weight: "ใบ",
    image:
      "https://s3gw.inet.co.th:8082/smegp-image-1/prod/V1/120720215908041.%E0%B9%83%E0%B8%9A%E0%B8%A1%E0%B8%B0%E0%B8%81%E0%B8%A3%E0%B8%B9%E0%B8%94%E0%B8%AA%E0%B8%94.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 8,
    name: "มะเขือเทศ",
    quantity: 0,
    weight: "ลูก",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 9,
    name: "มะละกอ",
    quantity: 0,
    weight: "ลูก",
    image:
      "https://amprohealth.com/wp-content/uploads/2019/08/%E0%B8%A1%E0%B8%B0%E0%B8%A5%E0%B8%B0%E0%B8%81%E0%B8%AD-1.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 10,
    name: "นมสด",
    quantity: 0,
    weight: "ขวด",
    image:
      "https://assets.tops.co.th/MEIJI-MeijiPasteurizedMilkPlain830cc-8850329183111-1?$JPEG$",
    favorite: false,
    allergies: false,
  },
  {
    id: 11,
    name: "หอยนางรม",
    quantity: 0,
    weight: "กรัม",
    image:
      "https://hdmall.co.th/blog/wp-content/uploads/2024/07/oyster-nutrition-and-benefits.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 12,
    name: "ไข่เป็ด",
    quantity: 0,
    weight: "ฟอง",
    image: "https://www.simummuangmarket.com/uploads/image-1549551682246.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 13,
    name: "พริกขี้หนู",
    quantity: 0,
    weight: "กรัม",
    image:
      "https://res.cloudinary.com/freshketimage001/image/upload/v1578641688/ilxfrmhyjnpcn7nr5ktm.png",
    favorite: false,
    allergies: false,
  },
  {
    id: 14,
    name: "กระเทียม",
    quantity: 0,
    weight: "กรัม",
    image:
      "https://www.simahealthcare.com/image/catalog/01-simaxray/ppp/Garlic.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 15,
    name: "หัวหอม",
    quantity: 0,
    weight: "กรัม",
    image: "https://www.simummuangmarket.com/uploads/image-1549549777893.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 16,
    name: "ต้นหอม",
    quantity: 0,
    weight: "ต้น",
    image:
      "https://adeq.or.th/wp-content/uploads/2019/04/%E0%B8%95%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%AD%E0%B8%A101.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 17,
    name: "ขิง",
    quantity: 0,
    weight: "หัว",
    image: "https://www.spfpowder.com/wp-content/uploads/2015/03/Ginger2.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 18,
    name: "ข่า",
    quantity: 0,
    weight: "หัว",
    image:
      "https://skm.ssru.ac.th/useruploads/images/20220111/2022011116419017404077.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 19,
    name: "ตะไคร้",
    quantity: 0,
    weight: "ต้น",
    image: "https://www.simahealthcare.com/image/catalog/01-simaxray/ppp/1.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 20,
    name: "เนย",
    quantity: 0,
    weight: "กรัม",
    image:
      "https://hdmall.co.th/blog/wp-content/uploads/2024/03/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%99%E0%B8%A2%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%8A%E0%B8%99%E0%B8%B4%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%A2%E0%B8%8A%E0%B8%99%E0%B9%8C%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A0%E0%B8%B2%E0%B8%9E-scaled.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 21,
    name: "น้ำมัน",
    quantity: 0,
    weight: "ขวด",
    image:
      "https://cdn8.devgodigit.net/wp-content/uploads/2021/09/30182414/000055395_P.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 22,
    name: "หมูสามชั้น",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://assets.tops.co.th/NONE-HygienicPorkBellySkinonS-0212368000008-1?$JPEG$",
    favorite: false,
    allergies: false,
  },
  {
    id: 23,
    name: "ปู",
    quantity: 0,
    weight: "ตัว",
    image:
      "https://seasia.alaskaseafood.org/wp-content/uploads/2023/04/Dungeness-Crab_600x400.jpeg",
    favorite: false,
    allergies: false,
  },
  {
    id: 24,
    name: "ปลาหมึก",
    quantity: 0,
    weight: "ตัว",
    image:
      "https://www.foodproject.co.th/uploads/products/webp/1682391000_n01021011312511-whole-squid.jpg.webp",
    favorite: false,
    allergies: false,
  },
  {
    id: 25,
    name: "มะนาว",
    quantity: 0,
    weight: "ลูก",
    image:
      "https://www.panmai.com/wp-content/uploads/2021/07/%E0%B8%A1%E0%B8%B0%E0%B8%99%E0%B8%B2%E0%B8%A7.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 26,
    name: "ผักบุ้ง",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://arit.kpru.ac.th/ap2/local/contents/Herbs_kpp/thumbs/thumb_Morning-glory.webp",
    favorite: false,
    allergies: false,
  },
  {
    id: 27,
    name: "ผักกาดขาว",
    quantity: 0,
    weight: "ชิ้น",
    image: "https://www.disthai.com/images/content/original-1643870467735.jpg",
    favorite: false,
    allergies: false,
  },
  {
    id: 28,
    name: "ถั่วฝักยาว",
    quantity: 0,
    weight: "ชิ้น",
    image:
      "https://i0.wp.com/www.freshfoodsbkk.com/wp-content/uploads/2017/11/string-bean.jpg?fit=500%2C500&ssl=1",
    favorite: false,
    allergies: false,
  },
  {
    id: 29,
    name: "แตงกวา",
    quantity: 0,
    weight: "ชิ้น",
    image: "https://www.opsmoac.go.th/data/local_wisdom/l/631100000121.jpg",
    favorite: false,
    allergies: false,
  },
];

// ข้อมูลสมาชิก
let members = [
  {
    id: 1,
    name: "Chamoile",
    role: "Leader",
    image: "https://img2.pic.in.th/pic/user_1077114.png",
  },
];

// ข้อมูลผู้ใช้ที่สามารถเพิ่มได้ (สมมติฐาน)
let availableUsers = [
  {
    id: 3,
    name: "K",
    image:
      "https://support.heberjahiz.com/hc/article_attachments/21013076295570",
  },
  {
    id: 4,
    name: "Ink",
    image:
      "https://img5.pic.in.th/file/secure-sv1/b945d7a2-1dfb-4b37-8104-dccfa6c2388c.jpg",
  },
  {
    id: 5,
    name: "Boss",
    image: "https://img2.pic.in.th/pic/user_1077114.png",
  },
  {
    id: 6,
    name: "Wave",
    image: "https://img2.pic.in.th/pic/user_1077114.png",
  },
  {
    id: 7,
    name: "Job",
    image: "https://img2.pic.in.th/pic/user_1077114.png",
  },
  {
    id: 8,
    name: "Noey",
    image: "https://img2.pic.in.th/pic/user_1077114.png",
  },
  {
    id: 9,
    name: "Voy",
    image: "https://img2.pic.in.th/pic/user_1077114.png",
  },
];
let userIngredients = {
  3: [
    // K
    {
      id: 2,
      name: "หมู",
      quantity: 3,
      weight: "ชิ้น",
      image:
        "https://i0.wp.com/maidencreekbeef.com/wp-content/uploads/2022/06/raw-pork-chops-.jpeg?fit=612%2C408&ssl=1",
    },
    {
      id: 5,
      name: "กระเพรา",
      quantity: 2,
      weight: "ชิ้น",
      image:
        "https://www.sooktookkum.com/wp-content/uploads/2021/03/%E0%B9%83%E0%B8%9A%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2.png",
    },
    {
      id: 4,
      name: "ไข่",
      quantity: 5,
      weight: "ฟอง",
      image:
        "https://kidseatincolor.com/wp-content/uploads/2022/02/eggs-e1648216369366.jpeg",
    },
  ],
  4: [
    // Ink
    {
      id: 1,
      name: "ไก่",
      quantity: 5,
      weight: "ชิ้น",
      image:
        "https://chefsmandala.com/wp-content/uploads/2018/03/Chicken-Breast-600x338.jpg",
    },
    {
      id: 8,
      name: "มะเขือเทศ",
      quantity: 2,
      weight: "ลูก",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg",
    },
  ],
  5: [
    // Boss
    {
      id: 3,
      name: "เนื้อ",
      quantity: 2,
      weight: "ชิ้น",
      image:
        "https://cdn-ikpgpdn.nitrocdn.com/tLoRzupMkqhbSMgOMvnedXGeHBZqobJG/assets/images/optimized/rev-286ae25/marew.net/wp-content/uploads/2024/03/%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%99%E0%B8%84%E0%B8%AD%E0%B8%A7%E0%B8%B1%E0%B8%A7Chuck-1024x1024.webp",
    },
    {
      id: 6,
      name: "กุ้ง",
      quantity: 4,
      weight: "ชิ้น",
      image:
        "https://thumb.ac-illust.com/ea/ea11640e45593d02e01d38debca5ac35_t.jpeg",
    },
  ],
  6: [
    // Wave
    {
      id: 7,
      name: "ใบมะกรูด",
      quantity: 10,
      weight: "ใบ",
      image:
        "https://s3gw.inet.co.th:8082/smegp-image-1/prod/V1/120720215908041.%E0%B9%83%E0%B8%9A%E0%B8%A1%E0%B8%B0%E0%B8%81%E0%B8%A3%E0%B8%B9%E0%B8%94%E0%B8%AA%E0%B8%94.jpg",
    },
    {
      id: 9,
      name: "มะละกอ",
      quantity: 1,
      weight: "ลูก",
      image:
        "https://amprohealth.com/wp-content/uploads/2019/08/%E0%B8%A1%E0%B8%B0%E0%B8%A5%E0%B8%B0%E0%B8%81%E0%B8%AD-1.jpg",
    },
  ],
  7: [
    // Job
    {
      id: 2,
      name: "หมู",
      quantity: 4,
      weight: "ชิ้น",
      image:
        "https://i0.wp.com/maidencreekbeef.com/wp-content/uploads/2022/06/raw-pork-chops-.jpeg?fit=612%2C408&ssl=1",
    },
    {
      id: 4,
      name: "ไข่",
      quantity: 3,
      weight: "ฟอง",
      image:
        "https://kidseatincolor.com/wp-content/uploads/2022/02/eggs-e1648216369366.jpeg",
    },
  ],
  8: [
    // Noey
    {
      id: 6,
      name: "กุ้ง",
      quantity: 3,
      weight: "ชิ้น",
      image:
        "https://thumb.ac-illust.com/ea/ea11640e45593d02e01d38debca5ac35_t.jpeg",
    },
    {
      id: 8,
      name: "มะเขือเทศ",
      quantity: 4,
      weight: "ลูก",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Bright_red_tomato_and_cross_section02.jpg",
    },
  ],
  9: [
    // Voy
    {
      id: 1,
      name: "ไก่",
      quantity: 2,
      weight: "ชิ้น",
      image:
        "https://chefsmandala.com/wp-content/uploads/2018/03/Chicken-Breast-600x338.jpg",
    },
    {
      id: 5,
      name: "กระเพรา",
      quantity: 3,
      weight: "ชิ้น",
      image:
        "https://www.sooktookkum.com/wp-content/uploads/2021/03/%E0%B9%83%E0%B8%9A%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2.png",
    },
  ],
};

// ข้อมูลการแจ้งเตือน
let notifications = [
  {
    id: 1,
    name: "Tuyen",
    message:
      "ขอต้อนรับสู่โลกแห่งความเย็นฉ่ำของตู้เย็น ที่ทุกสิ่งสดใหม่และพร้อมให้คุณค้นพบ",
    image: "https://img2.pic.in.th/pic/message_8604199.md.png",
  },
];

// API หน้าแรก
app.get("/", (req, res) => {
  res.send("สวัสดี! นี่คือ Backend ของคุณ");
});

// API ดึงส่วนผสมทั้งหมด (My Ingredient)
app.get("/api/ingredients", (req, res) => {
  res.json(ingredients);
});

// API ดึงสมาชิกทั้งหมด
app.get("/api/members", (req, res) => {
  res.json(members);
});

// API
app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});
// API ค้นหาสมาชิก
app.get("/api/members/search", (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  if (!query) {
    return res.json([]);
  }

  // กรองผู้ใช้ที่ยังไม่ได้อยู่ในทีม
  const filteredUsers = availableUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query) &&
      !members.some((member) => member.id === user.id)
  );

  res.json(filteredUsers);
});

// API เพิ่มสมาชิก
app.post("/api/members/add", (req, res) => {
  const { id } = req.body;
  const userToAdd = availableUsers.find((user) => user.id === parseInt(id));

  if (!userToAdd) {
    return res.status(404).send("ไม่พบผู้ใช้ที่ต้องการเพิ่ม");
  }

  if (members.some((member) => member.id === userToAdd.id)) {
    return res.status(400).send("สมาชิกนี้อยู่ในทีมแล้ว");
  }

  const newMember = {
    id: userToAdd.id,
    name: userToAdd.name,
    role: "Member",
    image: userToAdd.image,
  };

  members.push(newMember);

  // รวมวัตถุดิบของสมาชิกใหม่เข้ากับ ingredients
  const userIng = userIngredients[userToAdd.id] || [];
  userIng.forEach((newIng) => {
    const existingIng = ingredients.find((ing) => ing.id === newIng.id);
    if (existingIng) {
      existingIng.quantity += newIng.quantity;
    } else {
      ingredients.push({
        ...newIng,
        favorite: false,
        allergies: false,
      });
    }
  });

  const notification = {
    id: notifications.length
      ? notifications[notifications.length - 1].id + 1
      : 1,
    name: "System",
    message: `สมาชิก ${newMember.name} ถูกเพิ่มในทีม`,
    image: "https://img2.pic.in.th/pic/message_8604199.md.png",
  };
  notifications.push(notification);

  res.status(201).json(newMember);
});

// API ลบสมาชิก
app.delete("/api/members/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = members.findIndex((member) => member.id === id);
  if (index === -1) {
    return res.status(404).send("ไม่พบสมาชิกที่ต้องการลบ");
  }
  const member = members[index];
  members.splice(index, 1);

  // ลบวัตถุดิบของสมาชิกออกจาก ingredients
  const userIng = userIngredients[member.id] || [];
  userIng.forEach((ing) => {
    const existingIng = ingredients.find((i) => i.id === ing.id);
    if (existingIng) {
      existingIng.quantity -= ing.quantity;
      if (existingIng.quantity <= 0) {
        const ingIndex = ingredients.indexOf(existingIng);
        ingredients.splice(ingIndex, 1);
      }
    }
  });

  const notification = {
    id: notifications.length
      ? notifications[notifications.length - 1].id + 1
      : 1,
    name: "System",
    message: `สมาชิก ${member.name} ถูกลบออกจากทีม`,
    image: "https://img2.pic.in.th/pic/message_8604199.md.png",
  };
  notifications.push(notification);

  res.send("ลบสมาชิกสำเร็จ");
});

// API เพิ่มส่วนผสมใหม่ (My Ingredient)
app.post("/api/ingredients", (req, res) => {
  const { name, quantity, weight, image, favorite, allergies } = req.body;
  const newIngredient = {
    id: ingredients.length ? ingredients[ingredients.length - 1].id + 1 : 1,
    name,
    quantity,
    weight,
    image,
    favorite,
    allergies,
  };
  ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

// API อัปเดตส่วนผสม (My Ingredient)
app.put("/api/ingredients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, quantity, weight, image, favorite, allergies } = req.body;
  const index = ingredients.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).send("ไม่พบส่วนผสมที่ต้องการอัปเดต");
  }
  ingredients[index] = {
    id,
    name,
    quantity,
    weight,
    image,
    favorite,
    allergies,
  };
  res.json(ingredients[index]);
});

// API ลบส่วนผสม (My Ingredient)
app.delete("/api/ingredients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = ingredients.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).send("ไม่พบส่วนผสมที่ต้องการลบ");
  }
  const ingredient = ingredients[index];
  ingredients.splice(index, 1);

  const notification = {
    id: notifications.length
      ? notifications[notifications.length - 1].id + 1
      : 1,
    name: "System",
    message: `วัตถุดิบ ${ingredient.name} ถูกลบออกจากรายการ`,
    image: "https://img2.pic.in.th/pic/message_8604199.md.png",
  };
  notifications.push(notification);

  res.send("ลบส่วนผสมสำเร็จ");
});

// API ดึงการแจ้งเตือนทั้งหมด
app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

// API ลบการแจ้งเตือนทั้งหมด
app.delete("/api/notifications", (req, res) => {
  notifications = [];
  res.send("ลบการแจ้งเตือนทั้งหมดสำเร็จ");
});

// API บันทึกเมนูที่เลือก
app.post("/api/menu-select", (req, res) => {
  const { name, image, ingredients } = req.body;
  console.log("เมนูที่เลือก:", { name, image, ingredients });
  res.json({ status: "success", message: "บันทึกการเลือกเมนูเรียบร้อย" });
});

//API อัปเดควัตถุดิบหลังทำ
app.post("/api/save-ingredients", (req, res) => {
  const { newingredients } = req.body;
  const depletedIngredients = []; // เก็บวัตถุดิบที่ถูกลบจนเหลือ 0

  console.log("วัตถุดิบที่ใช้", newingredients);
  newingredients.forEach((item) => {
    const parts = item.split(" ");
    const name = parts[0];
    const quantityToRemove = parseInt(parts[1]) || 0;

    const existingItem = ingredients.find((ing) => ing.name === name);
    if (existingItem) {
      existingItem.quantity -= quantityToRemove;
      if (existingItem.quantity <= 0) {
        existingItem.quantity = 0; // ป้องกันติดลบ
        depletedIngredients.push(existingItem.name); // เพิ่มชื่อวัตถุดิบที่หมด
      }
    } else {
      console.log(`ไม่พบ "${name}" ในคลัง`);
    }
  });

  // เพิ่มการแจ้งเตือนสำหรับวัตถุดิบที่หมด
  if (depletedIngredients.length > 0) {
    const notification = {
      id: notifications.length
        ? notifications[notifications.length - 1].id + 1
        : 1,
      name: "System",
      message: `วัตถุดิบต่อไปนี้หมดแล้ว: ${depletedIngredients.join(", ")}`,
      image: "https://img2.pic.in.th/pic/message_8604199.md.png",
    };
    notifications.push(notification);
  }

  res.json({
    status: "success",
    message: "อัปเดตวัตถุดิบเรียบร้อย",
    depleted: depletedIngredients, // ยังส่งข้อมูล depleted ไปด้วย เผื่อใช้ในอนาคต
  });
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานที่ http://localhost:${port}`);
});

app.post("/api/user/:userId/ingredients", (req, res) => {
  const userId = parseInt(req.params.userId);
  const { ingredientId, quantity } = req.body;

  // ตรวจสอบว่าผู้ใช้มีรายการวัตถุดิบอยู่แล้วหรือไม่ ถ้าไม่ให้สร้างใหม่
  if (!userIngredients[userId]) {
    userIngredients[userId] = [];
  }

  // ตรวจสอบวัตถุดิบว่ามีในระบบหรือไม่
  const ingredient = ingredients.find((ing) => ing.id === ingredientId);
  if (!ingredient) {
    return res.status(404).send("ไม่พบวัตถุดิบ");
  }

  // เพิ่มวัตถุดิบให้กับผู้ใช้
  userIngredients[userId].push({
    id: ingredient.id,
    name: ingredient.name,
    quantity,
    weight: ingredient.weight,
    image: ingredient.image,
  });

  res.json(userIngredients[userId]);
});

app.get("/api/user/:userId/ingredients", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIng = userIngredients[userId] || [];
  res.json(userIng);
});

app.put("/api/ingredients", (req, res) => {
  const updatedIngredients = req.body;
  ingredients = updatedIngredients;
  res.json(ingredients);
});

app.use(express.json());

fetch("/api/user/3/ingredients", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ingredientId: 2, quantity: 3 }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
