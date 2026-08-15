import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { PopulationPyramid } from 'react-native-gifted-charts'
import { openDatabase } from 'react-native-sqlite-storage';


const db = openDatabase(
  {
  name: 'prf.db',
  location: 'default',
  //createFromLocation:"/storage/emulated/0/103_prf.db"
},
()=>{console.log("Database OK.....")},
error=>{Alert.alert("Database ERROR!!!!!!")}
);










const PopulationChart = ({cluster}) => {

  const[population, setPopulation] = useState({
    M_0_4:'0',
F_0_4:'0',
M_5_9:'0',
F_5_9:'0',
M_10_14:'0',
F_10_14:'0',
M_15_19:'0',
F_15_19:'0',
M_20_24:'0',
F_20_24:'0',
M_25_29:'0',
F_25_29:'0',
M_30_34:'0',
F_30_34:'0',
M_35_39:'0',
F_35_39:'0',
M_40_44:'0',
F_40_44:'0',
M_45_49:'0',
F_45_49:'0',
M_50_54:'0',
F_50_54:'0',
M_55_59:'0',
F_55_59:'0',

M_60_64:'0',
F_60_64:'0',
M_65_69:'0',
F_65_69:'0',
M_70_74:'0',
F_70_74:'0',
M_75_79:'0',
F_75_79:'0',
M_80_84:'0',
F_80_84:'0',
M_85_89:'0',
F_85_89:'0',
M_90_94:'0',
F_90_94:'0',
M_95_99:'0',
F_95_99:'0',
M_100:'0',
F_100:'0'

  });


  const[Loading,setLoading]=useState({
    LoadingState :false
  })

const Show_population_chart=()=>{


  db.transaction(tx=>{
    setLoading({LoadingState : true})

    tx.executeSql(
      "select  "+
      "count(b.Mem_SL)'M_0_4', count(c.Mem_SL)'F_0_4', "+
      "count(d.Mem_SL)'M_5_9', count(e.Mem_SL)'F_5_9', "+
      "count(f.Mem_SL)'M_10_14', count(g.Mem_SL)'F_10_14', "+
      "count(h.Mem_SL)'M_15_19', count(i.Mem_SL)'F_15_19', "+
      
      "count(j.Mem_SL)'M_20_24', count(k.Mem_SL)'F_20_24', "+
      "count(l.Mem_SL)'M_25_29', count(m.Mem_SL)'F_25_29', "+
      "count(n.Mem_SL)'M_30_34', count(o.Mem_SL)'F_30_34', "+
      "count(p.Mem_SL)'M_35_39', count(q.Mem_SL)'F_35_39', "+
      "count(r.Mem_SL)'M_40_44', count(s.Mem_SL)'F_40_44', "+
      "count(t.Mem_SL)'M_45_49', count(u.Mem_SL)'F_45_49', "+
      "count(v.Mem_SL)'M_50_54', count(w.Mem_SL)'F_50_54', "+
      "count(x.Mem_SL)'M_55_59', count(y.Mem_SL)'F_55_59', "+
      "count(z.Mem_SL)'M_60_64', count(aa.Mem_SL)'F_60_64', "+
      "count(ab.Mem_SL)'M_65_69', count(ac.Mem_SL)'F_65_69', "+
      "count(ad.Mem_SL)'M_70_74', count(ae.Mem_SL)'F_70_74', "+
      "count(af.Mem_SL)'M_75_79', count(ag.Mem_SL)'F_75_79', "+
      "count(ah.Mem_SL)'M_80_84', count(ai.Mem_SL)'F_80_84', "+
      "count(aj.Mem_SL)'M_85_89', count(ak.Mem_SL)'F_85_89', "+
      "count(al.Mem_SL)'M_90_94', count(am.Mem_SL)'F_90_94', "+
      "count(an.Mem_SL)'M_95_99', count(ao.Mem_SL)'F_95_99', "+
      "count(ap.Mem_SL)'M_100', count(aq.Mem_SL)'F_100' "+
      
      "from member a  "+        
      "left join (select Mem_SL from member where round((((JulianDay('now')) - JulianDay(case  "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
        "else Mem_DOB end))/365.25)) between 0  and 4 and Mem_Sex = '1') b on a.Mem_SL = b.Mem_SL "+
        
        "left join (select Mem_SL from member where round((((JulianDay('now')) - JulianDay(case  "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
          "else Mem_DOB end))/365.25)) between 0  and 4 and Mem_Sex = '2') c on a.Mem_SL = c.Mem_SL "+
        
        
        
          "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
            "else Mem_DOB end))/365.25)) between 5  and 9 and Mem_Sex = '1') d on a.Mem_SL = d.Mem_SL "+
        
            "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
              "else Mem_DOB end))/365.25)) between 5  and 9 and Mem_Sex = '2') e on a.Mem_SL = e.Mem_SL "+
        
        
        
              "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                "else Mem_DOB end))/365.25)) between 10  and 14 and Mem_Sex = '1') f on a.Mem_SL = f.Mem_SL "+
        
                "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                  "else Mem_DOB end))/365.25)) between 10  and 14 and Mem_Sex = '2') g on a.Mem_SL = g.Mem_SL "+
        
        
        
        
                  "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                    "else Mem_DOB end))/365.25)) between 15  and 19 and Mem_Sex = '1') h on a.Mem_SL = h.Mem_SL "+
        
                    "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                      "else Mem_DOB end))/365.25)) between 15  and 19 and Mem_Sex = '2') i on a.Mem_SL = i.Mem_SL "+
        
        
        
                      "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                        "else Mem_DOB end))/365.25)) between 20  and 24 and Mem_Sex = '1') j on a.Mem_SL = j.Mem_SL "+
        
                        "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                          "else Mem_DOB end))/365.25)) between 20  and 24 and Mem_Sex = '2') k on a.Mem_SL = k.Mem_SL "+
        
        
        
        
                          "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                            " when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                            "else Mem_DOB end))/365.25)) between 25  and 29 and Mem_Sex = '1') l on a.Mem_SL = l.Mem_SL "+
        
                            "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                              "else Mem_DOB end))/365.25)) between 25  and 29 and Mem_Sex = '2') m on a.Mem_SL = m.Mem_SL "+
        
        
                              "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                "else Mem_DOB end))/365.25)) between 30  and 34 and Mem_Sex = '1') n on a.Mem_SL = n.Mem_SL "+
        
                                "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                  "else Mem_DOB end))/365.25)) between 30  and 34 and Mem_Sex = '2') o on a.Mem_SL = o.Mem_SL "+
        
        
                                  "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                    "else Mem_DOB end))/365.25)) between 35  and 39 and Mem_Sex = '1') p on a.Mem_SL = p.Mem_SL "+
        
                                    "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                      "else Mem_DOB end))/365.25)) between 35  and 39 and Mem_Sex = '2') q on a.Mem_SL = q.Mem_SL "+
        
        
        
        
                                      "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                        "else Mem_DOB end))/365.25)) between 40  and 44 and Mem_Sex = '1') r on a.Mem_SL = r.Mem_SL "+
        
                                        "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                          "else Mem_DOB end))/365.25)) between 40  and 44 and Mem_Sex = '2') s on a.Mem_SL = s.Mem_SL "+
        
        
        
        
        
                                          "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                            "else Mem_DOB end))/365.25)) between 45  and 49 and Mem_Sex = '1') t on a.Mem_SL = t.Mem_SL "+
        
                                            "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                              "else Mem_DOB end))/365.25)) between 45  and 49 and Mem_Sex = '2') u on a.Mem_SL = u.Mem_SL "+
        
        
        
        
                                              "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                "else Mem_DOB end))/365.25)) between 50  and 54 and Mem_Sex = '1') v on a.Mem_SL = v.Mem_SL "+
        
                                                "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                  "else Mem_DOB end))/365.25)) between 50  and 54 and Mem_Sex = '2') w on a.Mem_SL = w.Mem_SL "+
        
        
        
        
                                                  "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                    "else Mem_DOB end))/365.25)) between 55  and 59 and Mem_Sex = '1') x on a.Mem_SL = x.Mem_SL "+
        
                                                    "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                      "else Mem_DOB end))/365.25)) between 55  and 59 and Mem_Sex = '2') y on a.Mem_SL = y.Mem_SL "+



                                                      "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                        "else Mem_DOB end))/365.25)) between 60  and 64 and Mem_Sex = '1') z on a.Mem_SL = z.Mem_SL "+
                                                    
                                                        "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                          "else Mem_DOB end))/365.25)) between 60  and 64 and Mem_Sex = '2') aa on a.Mem_SL = aa.Mem_SL "+
                                                    
                                                    
                                                    
                                                          "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                            "else Mem_DOB end))/365.25)) between 65  and 69 and Mem_Sex = '1') ab on a.Mem_SL = ab.Mem_SL "+
                                                    
                                                            "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                              "else Mem_DOB end))/365.25)) between 65  and 69 and Mem_Sex = '2') ac on a.Mem_SL = ac.Mem_SL "+
                                                    
                                                    
                                                    
                                                    
                                                              "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                "else Mem_DOB end))/365.25)) between 70  and 74 and Mem_Sex = '1') ad on a.Mem_SL = ad.Mem_SL "+
                                                    
                                                                "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                  "else Mem_DOB end))/365.25)) between 70  and 74 and Mem_Sex = '2') ae on a.Mem_SL = ae.Mem_SL "+
                                                    
                                                    
                                                    
                                                                  "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                    "else Mem_DOB end))/365.25)) between 75  and 79 and Mem_Sex = '1') af on a.Mem_SL = af.Mem_SL "+
                                                    
                                                                    "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                      "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                      "else Mem_DOB end))/365.25)) between 75  and 79 and Mem_Sex = '2') ag on a.Mem_SL = ag.Mem_SL "+
                                                    
                                                    
                                                    
                                                    
                                                                      "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                        "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                        "else Mem_DOB end))/365.25)) between 80  and 84 and Mem_Sex = '1') ah on a.Mem_SL = ah.Mem_SL "+
                                                    
                                                                        "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                          "else Mem_DOB end))/365.25)) between 80  and 84 and Mem_Sex = '2') ai on a.Mem_SL = ai.Mem_SL "+
                                                    
                                                    
                                                    
                                                                          "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                            "else Mem_DOB end))/365.25)) between 85  and 89 and Mem_Sex = '1') aj on a.Mem_SL = aj.Mem_SL "+
                                                    
                                                                            "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                              "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                              "else Mem_DOB end))/365.25)) between 85  and 89 and Mem_Sex = '2') ak on a.Mem_SL = ak.Mem_SL "+
                                                    
                                                    
                                                    
                                                                              "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                                "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                                "else Mem_DOB end))/365.25)) between 90  and 94 and Mem_Sex = '1') al on a.Mem_SL = al.Mem_SL "+
                                                    
                                                                                "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                                  "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                                                  "else Mem_DOB end))/365.25)) between 90  and 94 and Mem_Sex = '2') am on a.Mem_SL = am.Mem_SL "+
                                                    
                                                    
                                                    
                                                                                  "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                                                    "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                        "else Mem_DOB end))/365.25)) between 95  and 99 and Mem_Sex = '1') an on a.Mem_SL = an.Mem_SL "+
                                                    
                                                        "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                          "else Mem_DOB end))/365.25)) between 95  and 99 and Mem_Sex = '2') ao on a.Mem_SL = ao.Mem_SL "+
                                                    
                                                    
                                                    
                                                          "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                            "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                        "else Mem_DOB end))/365.25)) >=100 and Mem_Sex = '1') ap on a.Mem_SL = ap.Mem_SL "+
                                                    
                                                        "left join (select Mem_SL from member where ROUND((((JulianDay('now')) - JulianDay(case  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB  "+
                                                          "when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB  "+
                                                          "else Mem_DOB end))/365.25)) >=100 and Mem_Sex = '2') aq on a.Mem_SL = aq.Mem_SL "+
        
        
        
                                                      "where  "+
                                                      "a.Mem_Cstatus in ('1') and "+
                                                      "a.Village_Code||a.Bari_Code||a.HH_Code in (select village||bari||hh from HH where cStatus='1') and "+
                                                      "a.Village_Code||a.Bari_Code in (select village||bari from clusterDiv where cStatus = '1' and cluster = '"+cluster+"' group by village||bari) "+
                                                      "and "+
                                                      "a.Cluster = '"+cluster+"' ",
    [],
    (tx, result)=>{          
    var length = result.rows.length; 
    let results = [];         
            for(let i= 0; i<length; i++){
               let items=result.rows.item(i);          
              setPopulation({
                M_0_4:items.M_0_4,
                F_0_4:items.F_0_4,
                M_5_9:items.M_5_9,
                F_5_9:items.F_5_9,
                M_10_14:items.M_10_14,
                F_10_14:items.F_10_14,
                M_15_19:items.M_15_19,
                F_15_19:items.F_15_19,
                M_20_24:items.M_20_24,
                F_20_24:items.F_20_24,
                M_25_29:items.M_25_29,
                F_25_29:items.F_25_29,
                M_30_34:items.M_30_34,
                F_30_34:items.F_30_34,
                M_35_39:items.M_35_39,
                F_35_39:items.F_35_39,
                M_40_44:items.M_40_44,
                F_40_44:items.F_40_44,
                M_45_49:items.M_45_49,
                F_45_49:items.F_45_49,
                M_50_54:items.M_50_54,
                F_50_54:items.F_50_54,
                M_55_59:items.M_55_59,
                F_55_59:items.F_55_59,
                M_60_64:items.M_60_64,
                F_60_64:items.F_60_64,
                M_65_69:items.M_65_69,
                F_65_69:items.F_65_69,
                M_70_74:items.M_70_74,
                F_70_74:items.F_70_74,
                M_75_79:items.M_75_79,
                F_75_79:items.F_75_79,
                M_80_84:items.M_80_84,
                F_80_84:items.F_80_84,
                M_85_89:items.M_85_89,
                F_85_89:items.F_85_89,
                M_90_94:items.M_90_94,
                F_90_94:items.F_90_94,
                M_95_99:items.M_95_99,
                F_95_99:items.F_95_99,
                M_100:items.M_100,
                F_100:items.F_100
              })
              setLoading({LoadingState : false})    
            }
            
    })
  })
}


  // select a.mem_sex, count(a.Mem_SL) from member a 
  //     inner join (select cluster, block, village, bari, cStatus from clusterDiv where cluster = '103' and cStatus = '1' group by cluster, block, village, bari) b on 
  //     a.cluster = b.cluster and 
  //     a.Village_Code = b.village and 
  //     a.Bari_Code = b.bari 
  //     where 
  //     a.Mem_Cstatus in ('1') 
  //     and 
	// 	(((JulianDay('now')) - JulianDay(case 
  //       when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '1' then BirthCertificate_DOB 
  //       when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '1' then NID_DOB 
  //       when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '1' then EPI_DOB 
  //       when DOB_Verified_Docs = '1' and BirthCertificate_Verified = '2' and NID_Verified = '2' and EPI_Verified = '2' and OtherDocs_Verified = '1' then OtherDocs_DOB 
  //       else Mem_DOB end))/365.25)>=60
  //     and 
  //     a.Cluster = '103'
	//   group by a.mem_sex


  const popData = [
    {left: population.M_100, right: population.F_100, midAxisLabel: '~65'},
    {left: population.M_95_99, right: population.F_95_99, midAxisLabel: '~65'},
    {left: population.M_90_94, right: population.F_90_94, midAxisLabel: '~65'},
    {left: population.M_85_89, right: population.F_85_89, midAxisLabel: '~65'},
    {left: population.M_80_84, right: population.F_80_84, midAxisLabel: '~65'},
    {left: population.M_75_79, right: population.F_75_79, midAxisLabel: '~65'},
    {left: population.M_70_74, right: population.F_70_74, midAxisLabel: '~65'},
    {left: population.M_65_69, right: population.F_65_69, midAxisLabel: '~65'},
    {left: population.M_60_64, right: population.F_60_64, midAxisLabel: '~65'},
    {left: population.M_55_59, right: population.F_55_59, midAxisLabel: '~65'},
    {left: population.M_50_54, right: population.F_50_54, midAxisLabel: '~65'},
    {left: population.M_45_49, right: population.F_45_49, midAxisLabel: '~65'},
    {left: population.M_40_44, right: population.F_40_44, midAxisLabel: '~65'},
    {left: population.M_35_39, right: population.F_35_39, midAxisLabel: '~65'},
    {left: population.M_30_34, right: population.F_30_34, midAxisLabel: '~65'},
    {left: population.M_25_29, right: population.F_25_29, midAxisLabel: '~65'},
    {left: population.M_20_24, right: population.F_20_24, midAxisLabel: '~65'},
    {left: population.M_15_19, right: population.F_15_19, midAxisLabel: '~65'},
    {left: population.M_10_14, right: population.F_10_14, midAxisLabel: '~65'},
    {left: population.M_5_9, right: population.F_5_9, midAxisLabel: '~65'},
    {left: population.M_0_4, right: population.F_0_4, midAxisLabel: '~65'}
  ];
 
useEffect(()=>{
  Show_population_chart();
},[])  

  

if(Loading.LoadingState==true){
  return(
    <View style={{backgroundColor: '#f0f0f0', height:'auto'}}>
      <ActivityIndicator color={"red"} size={"large"}/>
    </View>
  );

}else{



  return (
    <View style={{backgroundColor: '#f0f0f0', height:'auto'}}>
      <PopulationPyramid
        data={popData}
        yAxisLabelTexts={[
          '0-4',
          '5-9',
          '10-14',
          '15-19',
          '20-24',
          '25-29',
          '30-34',
          '35-39',
          '40-44',
          '45-49',
          '50-54',
          '55-59',
          '60-64',
          '65-69',
          '70-74',
          '75-79',
          '80-84',
          '85-89',
          '90-94',
          '95-99',
          '100+',
        ].reverse()}
        yAxisLabelFontSize={14}
        showValuesAsBarLabels
        leftBarLabelShift={10}
        rightBarLabelShift={-0}
        rightBarLabelFontSize={14}
        leftBarLabelFontSize={14}
        leftBarLabelFontWeight={300}
        leftBarBorderRadius={1}
        rightBarLabelFontWeight={300}
        rightBarBorderRadius={1}
        height={420}
        width={780}
        yAxisLabelWidth={50}
        verticalMarginBetweenBars={3}
        
        leftBarLabelColor={'#404040'}
        rightBarLabelColor={'#404040'}
        rulesThickness={2}
        leftBarColor={"#06b6d4"}
        rightBarColor={"#ec4899"}
        rulesColor={"#f472b6"}
      />
    </View>
  );
      }


      


}

export default PopulationChart
