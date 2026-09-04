import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { ALL_MENU_ITEMS, GALLERY_ITEMS, TESTIMONIALS, TIMELINE_STORIES } from "../src/data/restaurantData";

const prisma = new PrismaClient();

async function main() {
  for (const item of ALL_MENU_ITEMS) {
    await prisma.menuItem.upsert({ where: { id: item.id }, update: { ...item, dietary: item.dietary }, create: { ...item, dietary: item.dietary } });
  }
  for (const item of GALLERY_ITEMS) {
    await prisma.galleryImage.upsert({ where: { id: item.id }, update: { url: item.image, title: item.title, category: item.category, aspect: item.aspect, caption: item.caption }, create: { id: item.id, url: item.image, title: item.title, category: item.category, aspect: item.aspect, caption: item.caption } });
  }
  for (const item of TESTIMONIALS) {
    await prisma.testimonial.upsert({ where: { id: item.id }, update: item, create: item });
  }
  for (const item of TIMELINE_STORIES) {
    await prisma.experience.upsert({ where: { id: item.year }, update: item, create: { id: item.year, ...item } });
  }
  const password = await bcrypt.hash("admin123", 12);
  await prisma.admin.upsert({ where: { email: "admin@thegardentable.com" }, update: { password }, create: { email: "admin@thegardentable.com", password } });
}

main().finally(() => prisma.$disconnect());
