import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateIdentificationDto } from './dto/create-identification.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) { }

  @Post()
  async create(@Body() createRegistration: CreateIdentificationDto) {
    const registration = await this.registrationService.createRegistration(createRegistration)
    return registration
  }


  @Patch(':id/document')
  async updateDocument(@Param('id') id: string, @Body() document: UpdateDocumentDto) {

    const updatedRegistration = await this.registrationService.updateRegistration(id, document)

    return updatedRegistration
  }


  @Patch(':id/contact')
  async updateContact(@Param('id') id: string, @Body() phone: UpdateContactDto) {

    const updatedRegistration = await this.registrationService.updateRegistration(id, phone)

    return updatedRegistration
  }

  @Patch(':id/address')
  async updateAddress(@Param('id') id: string, @Body() address: UpdateAddressDto) {

    const updatedRegistration = await this.registrationService.updateAddress(id, address)

    return updatedRegistration
  }


  @Patch('id/finish')
  async finish(@Param('id') id: string) {

    const updatedRegistration = await this.registrationService.finishRegistration(id)

    return {
      message: 'Cadastro finalizado com sucesso',
      registration: updatedRegistration
    }
  }
}
