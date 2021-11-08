using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OffOnOtomasyonu.Models.Siniflar
{
    public class Faturalar
    {
        [Key]
        public int Faturaid { get; set; }

        [Column(TypeName = "char")]
        [StringLength(1)]
        public string FaturaSeriNo { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(15)]
        public string FaturaSıraNo { get; set; }

        public DateTime Tarih { get; set; }

        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string VergiDairesi { get; set; }

        [Column(TypeName = "char")]
        [StringLength(5)]
        public string Saat { get; set; }

        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string TeslimEden { get; set; }

        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string TeslimAlan { get; set; }


        public decimal Toplam { get; set; }

        public ICollection<FaturaKalem> FaturaKalems { get; set; }



    }
}