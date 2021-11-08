using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OffOnOtomasyonu.Models.Siniflar
{
    public class KargoTakip
    {
        [Key]
        public int KargoTakipid { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(11)]
        public string TakipKodu { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(200)]
        public string Aciklama { get; set; }
        public DateTime TarihZaman { get; set; }
    }
}