import { prisma } from "@/Config/database";
import { Credential } from "@/protocols";
import Cryptr from "cryptr";

async function verifyExistingNameQuery(credential: Credential, userId: number) {
  return prisma.credential.findFirst({
    where: {
      userId,
      title: credential.title,
    },
  });
}

async function insertCredentialQuery(credential: Credential, userId: number) {
  const cryptr = new Cryptr("myTotallySecretKey");
  const encryptedString = cryptr.encrypt(credential.password);

  return prisma.credential.create({
    data: {
      password: encryptedString,
      title: credential.title,
      url: credential.url,
      username: credential.username,
      userId,
    },
  });
}

async function getSpecificCredentialQuery(id: string, userId: number) {
  return prisma.credential.findFirst({
    where: {
      id: Number(id),
      userId,
    },
  });
}

async function getCredentialQuery(userId: number) {
  return prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

async function deleteCredential(userId: number, id: string) {
  return prisma.credential.deleteMany({
    where: {
      userId,
      id: Number(id),
    },
  });
}

const credentialRepository = {
  verifyExistingNameQuery,
  insertCredentialQuery,
  getSpecificCredentialQuery,
  getCredentialQuery,
  deleteCredential,
};

export default credentialRepository;
