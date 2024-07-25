import { PrismaClient, Prisma } from "@prisma/client";

class MyPrisma {
  static prisma: PrismaClient | undefined;
  static getPrisma() {
    if (this.prisma === null || !this.prisma) this.prisma = new PrismaClient();
    return this.prisma;
  }
}

export default MyPrisma;

export function getTranslation(tr: string) {
  if (tr == 'bn') return {bn_ayahs:{select: {text: true}}}
  return {en_ayahs:{select: {text: true}}};
}