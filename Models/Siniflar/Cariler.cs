using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OffOnOtomasyonu.Models.Siniflar
{
    public class Cariler
    {

        [Key]
        public int Cariid { get; set; }

        [Display(Name = "Cari Adı")]
        [Column(TypeName = "varchar")]
        [StringLength(30, ErrorMessage = "En fazla 30 karakter yazabilirsiniz!")]
        [Required(ErrorMessage = "Bu alanı Boş geçemezsin!")]
        public string CariAd { get; set; }

        [Display(Name = "Cari  Soyadı")]
        [Column(TypeName = "varchar")]
        [StringLength(30, ErrorMessage = "En fazla 30 karakter yazabilirsiniz!")]
        [Required(ErrorMessage = "Bu alanı Boş geçemezsin!")]
        public string CariSoyad { get; set; }

        [Display(Name = "Cari Şehir")]
        [Column(TypeName = "varchar")]
        [StringLength(30, ErrorMessage = "En fazla 30 karakter yazabilirsiniz!")]
        [Required(ErrorMessage = "Bu alanı Boş geçemezsin!")]
        public string CariSehir { get; set; }

        [Display(Name = "Cari Mail")]
        [Column(TypeName = "varchar")]
        [StringLength(50, ErrorMessage = "En fazla 50 karakter yazabilirsiniz!")]
        public string CariMail { get; set; }

        [Display(Name = "Cari Adres")]
        [Column(TypeName = "varchar")]
        [StringLength(500, ErrorMessage = "En fazla 500 karakter yazabilirsiniz!")]
        public string CariAdres { get; set; }


        [Column(TypeName = "varchar")]
        [Display(Name = "Cari Tel")]
        [StringLength(11, ErrorMessage = "En fazla 11 karakter yazabilirsiniz!")]
        [Required(ErrorMessage = "Bu alanı Boş geçemezsin!")]
        public string CariTel { get; set; }

        [Column(TypeName = "varchar")]
        [StringLength(20)]
        [Display(Name = "Cari Şifre")]
        public string CariSifre { get; set; }




        public bool Durum { get; set; }

        public ICollection<SatisHareket> SatisHarekets { get; set; }


    }
}