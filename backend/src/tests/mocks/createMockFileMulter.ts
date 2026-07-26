export function createMockFileMulter(
  overrides: Partial<Express.Multer.File> = {}
): Express.Multer.File {
  return {
    fieldname: 'file',
    originalname: 'avatar.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 1024,
    destination: '/tmp',
    filename: 'avatar.png',
    path: '/tmp/avatar.png',
    buffer: Buffer.from('fake image'),
    ...overrides,
  } as Express.Multer.File;
}
