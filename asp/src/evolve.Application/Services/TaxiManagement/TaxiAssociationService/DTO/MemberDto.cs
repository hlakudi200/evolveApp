using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using evolve.Domain.DriverManagement;

namespace evolve.Services.TaxiManagement.TaxiAssociationService.DTO
{
    [AutoMap(typeof(Driver))]
    public class MemberDto : EntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string FullName { get; set; }
        public string LicenseNumber { get; set; }
        public bool IsActive { get; set; }
    }
}
