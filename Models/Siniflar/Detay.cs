﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OffOnOtomasyonu.Models.Siniflar
{
    public class Detay
    {
        [Key]
        public int DetayID { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string urunad { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(3000)]
        public string urunbilgi { get; set; }
    }
}