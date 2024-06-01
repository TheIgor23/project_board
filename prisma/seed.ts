import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      passwordHash: 'hashed_password',
      email: 'john_doe@example.com',
      projects: {
        create: [
          {
            name: 'Project 1',
            lists: {
              create: [
                {
                  name: 'List 1',
                  position: 1,
                  cards: {
                    create: [
                      {
                        name: 'Card 1',
                        position: 1,
                        description: 'Description for Card 1',
                      },
                      {
                        name: 'Card 2',
                        position: 2,
                        description: 'Description for Card 2',
                      },
                    ],
                  },
                },
                {
                  name: 'List 2',
                  position: 2,
                  cards: {
                    create: [
                      {
                        name: 'Card 3',
                        position: 1,
                        description: 'Description for Card 3',
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            name: 'Project 2',
            lists: {
              create: [
                {
                  name: 'List 3',
                  position: 1,
                  cards: {
                    create: [
                      {
                        name: 'Card 4',
                        position: 1,
                        description: 'Description for Card 4',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
