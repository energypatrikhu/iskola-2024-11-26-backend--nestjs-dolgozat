import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
  Req,
  Search,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Travels } from './travels';
import type { CreateTravelDto, UpdateTravelDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private travels = new Travels();

  @Get('/travels')
  getTravels() {
    return this.travels.getAll();
  }

  @Get('/travels/:id')
  getTravelById(@Param('id') id: string) {
    return this.travels.getById(parseInt(id));
  }

  @Post('/travels')
  addTravel(
    @Body()
    data: CreateTravelDto,
  ) {
    return this.travels.add({
      destination: data.destination,
      description: data.description,
      imgUrl: data.imgUrl,
      price: data.price,
      discount: 0,
    });
  }

  @Patch('/travels/:id')
  updateTravel(
    @Param('id') id: string,
    @Body()
    data: UpdateTravelDto,
  ) {
    const travel = this.travels.getById(parseInt(id));
    if (!travel) {
      return 'Utazás nem található!';
    }

    let newData = { ...travel };

    newData.destination = data.destination || travel.destination;
    newData.description = data.description || travel.description;
    newData.imgUrl = data.imgUrl || travel.imgUrl;
    newData.price = data.price || travel.price;
    newData.discount = data.discount || travel.discount;

    this.travels.replace(parseInt(id), newData);
  }

  @Delete('/travels/:id')
  deleteTravel(@Param('id') id: string) {
    this.travels.remove(parseInt(id));
  }
}
