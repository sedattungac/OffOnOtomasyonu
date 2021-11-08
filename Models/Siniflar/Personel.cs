using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OffOnOtomasyonu.Models.Siniflar
{
    public class Personel
    {
        [Key]
        public int Personelid { get; set; }

        [Display(Name = "Personel Adı")]
        [Column(TypeName = "varchar")]
        [StringLength(30)]
        public String PersonelAd { get; set; }

        [Display(Name = "Personel Soyadı")]
        [Column(TypeName = "varchar")]
        [StringLength(30)]
        public string PersonelSoyad { get; set; }

        [Display(Name = "Personel Görsel")]
        [Column(TypeName = "varchar")]
        [StringLength(350)]
        public string PersonelGorsel { get; set; }

        [Display(Name = "Personel Mail")]
        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string PersonelMail { get; set; }

        [Display(Name = "Personel Adres")]
        [Column(TypeName = "varchar")]
        [StringLength(100)]
        public string PersonelAdres { get; set; }

        [Display(Name = "Personel Tel")]
        [Column(TypeName = "varchar")]
        [StringLength(11)]
        public string PersonelTel { get; set; }


        public ICollection<SatisHareket> SatisHarekets { get; set; }

        public int Departmanid { get; set; }

        public virtual Departman Departman { get; set; }

    }
}