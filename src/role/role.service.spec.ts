import { Test, TestingModule } from '@nestjs/testing'

import { RoleService } from './role.service'

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate basic roles',async ()=>{
    expect(await service.generateBasicRoles()).toBe('Basic roles generated')
  })
});
