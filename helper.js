import apellidos from "./data/apellidos.json" assert { type: "json" };
import calles from "./data/calles.json" assert { type: "json" };
import direcciones from "./data/direcciones.json" assert { type: "json" };
import nombres from "./data/nombres.json" assert { type: "json" };

const buildProfile = () => {
  const uppercaseLetters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );
  const addressData = JSON.parse(JSON.stringify(direcciones));
  const { nombres: nombresData } = JSON.parse(JSON.stringify(nombres));
  const { apellidos: apellidosData } = JSON.parse(JSON.stringify(apellidos));
  const { calles: callesData } = JSON.parse(JSON.stringify(calles));
  const randName = nombresData[Math.floor(Math.random() * nombresData.length)]
    .replace(/\. /g, " ")
    .replace(/\./g, " ");
  const randFirstLastname =
    apellidosData[Math.floor(Math.random() * apellidosData.length)];
  const randSecondLastname =
    apellidosData[Math.floor(Math.random() * apellidosData.length)];
  const randAddress =
    addressData[Math.floor(Math.random() * addressData.length)];
  const provincePrefix = randAddress.PRO;
  const randCP =
    String(provincePrefix) +
    String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  const randPhone = getRandPhone(provincePrefix);
  const randMobile =
    "6" + String(Math.floor(Math.random() * 100000000)).padStart(8, "0");
  const randNumber = String(Math.floor(Math.random() * 200));
  const randFloor = String(Math.floor(Math.random() * 5));
  const randBlock =
    uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  const randStreet = callesData[Math.floor(Math.random() * callesData.length)];
  const randStreetType = randStreet.split(" ")[0];
  const randDoor =
    uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  const randEmail = `${randName}.${randFirstLastname}@mail.gal`
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/ª/g, "a")
    .replace(/º/g, "o")
    .replace(/ñ/g, "nh")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .normalize("NFD");

  return {
    name: randName,
    firstLastName: randFirstLastname,
    secondLastName: randSecondLastname,
    nif: generateNIF(),
    streetType: randStreetType,
    streetName: randStreet,
    number: randNumber,
    block: randBlock,
    floor: randFloor,
    door: randDoor,
    parish: randAddress.PARROQUIA,
    city: randAddress.NOME,
    cp: randCP,
    province: randAddress.PROVINCIA,
    municipality: randAddress.CONCELLO,
    locality: randAddress.NOME,
    phone: randPhone,
    mobilePhone: randMobile,
    email: randEmail,
  };
};

const getRandPhone = (provincePrefix) => {
  if (provincePrefix === 15) {
    return "981" + String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  }
  if (provincePrefix === 27) {
    return "982" + String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  }
  if (provincePrefix === 32) {
    return "988" + String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  }
  if (provincePrefix === 36) {
    return "986" + String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  }
  return "900" + String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
};

function generateNIF() {
  const dni = Math.floor(Math.random() * 90000000) + 10000000;
  const letrasNIF = "TRWAGMYFPDXBNJZSQVHLCKE";
  const letra = letrasNIF.charAt(dni % 23);
  return `${dni}${letra}`;
}

export const generateProfiles = (profileNum) => {
  const profiles = [];
  for (let i = 0; i < profileNum; i++) {
    profiles.push(buildProfile());
  }
  return profiles;
};
