import { BadRequestException } from '@nestjs/common';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  if (!isValid) throw new BadRequestException('Invalid email format');

  return true;
}

export default isValidEmail;
