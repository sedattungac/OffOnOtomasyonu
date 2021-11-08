using OffOnOtomasyonu.Models.Siniflar;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OffOnOtomasyonu.Models.Sınıflar
{
    public class Kategori
    {
        [Key]

        public int KategoriID { get; set; }

        [Display(Name = "Kategori Adı")]
        [Column(TypeName = "varchar")]

        [StringLength(50)]
        public string KategoriAd { get; set; }
        public ICollection<Urun> Uruns { get; set; }
    }
}