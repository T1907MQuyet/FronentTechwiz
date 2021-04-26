  var Currency = {
    rates: {"USD":1.0,"EUR":1.20372,"GBP":1.39312,"CAD":0.799721,"ARS":0.01076,"AUD":0.775499,"BRL":0.179555,"CLP":0.00143234,"CNY":0.154008,"CYP":0.397899,"CZK":0.046547,"DKK":0.161871,"EEK":0.0706676,"HKD":0.128815,"HUF":0.00332175,"ISK":0.00797169,"INR":0.0132558,"JMD":0.006662,"JPY":0.00925654,"LVL":1.57329,"LTL":0.320236,"MTL":0.293496,"MXN":0.0502531,"NZD":0.720457,"NOK":0.11988,"PLN":0.264142,"SGD":0.752658,"SKK":21.5517,"SIT":175.439,"ZAR":0.0701884,"KRW":0.000895758,"SEK":0.11897,"CHF":1.0908,"TWD":0.0357015,"UYU":0.0226251,"MYR":0.242667,"BSD":1.0,"CRC":0.00162846,"RON":0.244367,"PHP":0.0206487,"AED":0.272294,"VEB":4.06108e-15,"IDR":6.88267e-05,"TRY":0.121987,"THB":0.0319275,"TTD":0.147127,"ILS":0.306099,"SYP":0.000795091,"XCD":0.370015,"COP":0.000276857,"RUB":0.0130539,"HRK":0.158891,"KZT":0.00231456,"TZS":0.000431205,"XPT":1215.57,"SAR":0.266667,"NIO":0.0284688,"LAK":0.000106287,"OMR":2.60078,"AMD":0.00191939,"CDF":0.000504807,"KPW":0.00111109,"SPL":6.0,"KES":0.00922059,"ZWD":0.00276319,"KHR":0.000246909,"MVR":0.0649721,"GTQ":0.129664,"BZD":0.496394,"BYR":3.85748e-05,"LYD":0.221781,"DZD":0.00752445,"BIF":0.000507885,"GIP":1.39312,"BOB":0.144923,"XOF":0.00183506,"STD":4.88158e-05,"NGN":0.00262841,"PGK":0.285,"ERN":0.0666667,"MWK":0.00126852,"CUP":0.0414906,"GMD":0.0196104,"CVE":0.0109161,"BTN":0.0132558,"XAF":0.00183506,"UGX":0.000276882,"MAD":0.11207,"MNT":0.000351177,"LSL":0.0701884,"XAG":26.5547,"TOP":0.443209,"SHP":1.39312,"RSD":0.0102428,"HTG":0.0120269,"MGA":0.000262913,"MZN":0.0162133,"FKP":1.39312,"BWP":0.0925249,"HNL":0.0416253,"PYG":0.000155205,"JEP":1.39312,"EGP":0.0637887,"LBP":0.00066335,"ANG":0.558655,"WST":0.396156,"TVD":0.775499,"GYD":0.00478033,"GGP":1.39312,"NPR":0.00824624,"KMF":0.00244674,"IRR":2.37953e-05,"XPD":2876.41,"SRD":0.0706947,"TMM":5.70851e-05,"SZL":0.0701884,"MOP":0.125063,"BMD":1.0,"XPF":0.0100872,"ETB":0.0241783,"JOD":1.41044,"MDL":0.0556643,"MRO":0.00278047,"YER":0.00399332,"BAM":0.615452,"AWG":0.558659,"PEN":0.269465,"VEF":4.06108e-12,"SLL":9.77778e-05,"KYD":1.21951,"AOA":0.00151741,"TND":0.364861,"TJS":0.0877287,"SCR":0.0723607,"LKR":0.00520825,"DJF":0.00562408,"GNF":0.000100714,"VUV":0.00922148,"SDG":0.00263085,"IMP":1.39312,"GEL":0.289497,"FJD":0.491783,"DOP":0.0175482,"XDR":1.43447,"MUR":0.0247265,"MMK":0.000710111,"LRD":0.00580168,"BBD":0.5,"ZMK":4.49347e-05,"XAU":1793.93,"VND":4.33654e-05,"UAH":0.03558,"TMT":0.285425,"IQD":0.000685228,"BGN":0.615452,"KGS":0.0117922,"RWF":0.00101748,"BHD":2.65957,"UZS":9.48877e-05,"PKR":0.00652734,"MKD":0.0195038,"AFN":0.0128895,"NAD":0.0701884,"BDT":0.0117838,"AZN":0.588589,"SOS":0.00173351,"QAR":0.274725,"PAB":1.0,"CUC":1.0,"SVC":0.114286,"SBD":0.126792,"ALL":0.00977646,"BND":0.752658,"KWD":3.31999,"GHS":0.173098,"ZMW":0.0449347,"XBT":53928.1,"NTD":0.0337206,"BYN":0.385748,"CNH":0.154033,"MRU":0.0278047,"STN":0.0488158,"VES":4.06108e-07,"MXV":0.333339},
    convert: function(amount, from, to) {
      return (amount * this.rates[from]) / this.rates[to];
    }
  };