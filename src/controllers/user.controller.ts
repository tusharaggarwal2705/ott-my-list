import { Controller, Get, Post, Put, Query, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { User } from '../utilities/interfaces/user.interface';
import { UserService } from 'src/services/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  async create(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }

  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({ status: 200, description: 'Return all user.' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'user not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'like content'})
  @ApiResponse({ status: 200, description: 'The user has liked content.' })
  @ApiResponse({ status: 404, description: 'user not found.' })
  @ApiResponse({ status: 404, description: 'contentId not found'})
  @Put('like-content/:contentType/:id/:contentId')
  async updateLikedContent(
      @Param('contentType') contentType: 'movie' | 'tvshow',
      @Param('id') id: string,
      @Param('contentId') contentId: string,
  ): Promise<User> {
      return this.userService.likeContent(contentType, id, contentId);
  }

  @ApiOperation({ summary: 'remove liked content'})
  @ApiResponse({ status: 200, description: 'The user has disliked content.' })
  @ApiResponse({ status: 404, description: 'user not found.' })
  @ApiResponse({ status: 404, description: 'contentId not found'})
  @Put('remove-like-content/:contentType/:id/:contentId')
  async updateDislikedContent(
      @Param('contentType') contentType: 'movie' | 'tvshow',
      @Param('id') id: string,
      @Param('contentId') contentId: string,
  ): Promise<User> {
      return this.userService.removelikedContent(contentType, id, contentId);
  }

  @ApiOperation({ summary: 'list liked content'})
  @ApiResponse({ status: 200 , description: 'Users liked content'})
  @Get('liked-content/:id')
  async likedContentList(
    @Param('id') id: string,
    @Query('page') page: number
  ){
    return this.userService.getLikedContent(id,page);
  }
}
