import {Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    @Post()
    create(@Body() customerDto: { document: string; name: string; email: string; phone: string }) {
        return this.customerService.create(customerDto);
    }

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCustomerDto: Partial<{ document: string; name: string; email: string; phone: string }>) {
        return this.customerService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerService.remove(id);
    }

}
