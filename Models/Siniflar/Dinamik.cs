﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OffOnOtomasyonu.Models.Siniflar
{
    public class Dinamik
    {
        public IEnumerable<Faturalar> deger1 { get; set; }
        public IEnumerable<FaturaKalem> deger2 { get; set; }
    }
}