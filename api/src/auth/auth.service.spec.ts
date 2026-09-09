// describe('login', () => {
//   it('should throw if user does not exist', async () => {
//     prisma.user.findFirst.mockResolvedValue(null);

//     await expect(
//       service.login({
//         email: 'test@test.com',
//         password: '12345678',
//       }),
//     ).rejects.toThrow(UnauthorizedException);
//   });
// });
