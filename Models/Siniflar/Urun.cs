using OffOnOtomasyonu.Models.Sınıflar;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OffOnOtomasyonu.Models.Siniflar
{
    public class Urun
    {

        [Key]
        public int Urunid { get; set; }

        [Display(Name = "Ürün Adı")]
        [Column(TypeName = "varchar")]
        [StringLength(50, ErrorMessage = "En fazla 50 karakter yazabilirsiniz!")]
        [Required(ErrorMessage = "Bu alanı Boş geçemezsin!")]
        public string UrunAd { get; set; }



        [Display(Name = "Ürün Markası")]
        [Column(TypeName = "varchar")]
        [StringLength(50, ErrorMessage = "En fazla 50 karakter yazabilirsiniz!")]
        public string Marka { get; set; }



        [Display(Name = "Ürün Stok")]
        public short Stok { get; set; }


        [Display(Name = "Ürün Alış Fiyatı")]
        public decimal AlisFiyat { get; set; }


        [Display(Name = "Ürün Satış Fiyatı")]
        public decimal SatisFiyat { get; set; }


        public bool Durum { get; set; }

        [Display(Name = "Ürün Görsel")]
        [Column(TypeName = "varchar")]
        [StringLength(350)]
        public string UrunGorsel { get; set; }
        public int Kategoriid { get; set; }



        public ICollection<SatisHareket> SatisHarekets { get; set; }


        public virtual Kategori Kategori { get; set; }



    }
}