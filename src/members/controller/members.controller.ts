import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MembersService } from '../service/members.service';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateMemberDto, UpdateMemberByIdDto } from '../dto/member.dto';
import { Prisma } from '@prisma/client';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService){}

  @Get('/')
  @ApiResponse({ status: 200, description: 'Get members successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getAllMembers() {
    console.log('hello')
    const members = this.membersService.getAllMembers()
    return members
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get member successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getMemberById(@Param('id') id: string ) {
    const member = this.membersService.getMemberById(id)
    return member
  }

  @Get(':name')
  @ApiResponse({ status: 200, description: 'Get member successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  getMemberByName(@Param('name') name: string ) {
    const member = this.membersService.getMemberByName(name)
    return member
  }

  @Post('/')
  @ApiBody({ type: CreateMemberDto  })
  @ApiResponse({ status: 201, description: 'The member has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  createMember(@Body() createMember: Prisma.MemberCreateInput) {
    const member = this.membersService.createMember(createMember)
  }

  @Put(':id')
  @ApiBody({ type: UpdateMemberByIdDto })
  @ApiResponse({ status: 201, description: 'The member has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  updateMemberById(@Body() member: UpdateMemberByIdDto, @Param('id') id: string ) {
    const user = this.membersService.updateMemberById(id, member)
    return user
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'The member has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  deleteMemberById(@Param('id') id: string) {
    const result = this.membersService.deleteMemberById(id)
    return result
  }
}
