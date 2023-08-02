import { ApiProperty } from "@nestjs/swagger";

export class Tokens {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}

export interface Payload {
  sub: number;
  email: string;
}
