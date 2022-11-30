<?php
$MYSQL_HostName       ="localhost";
$MYSQL_SiteDBUserName ="root";
$MYSQL_SiteDBName     ="laravel";
$MYSQL_SiteDBPassword ="root";

global $mysqli;
$mysqli = new mysqli($MYSQL_HostName, $MYSQL_SiteDBUserName, $MYSQL_SiteDBPassword, $MYSQL_SiteDBName);



$query="SELECT id, title, sourceLink, introText FROM contents ORDER BY id";
$result=$mysqli->query ($query);


while ($row=$result->fetch_assoc ())
  {
   $a=stripcslashes ($row["introText"]);

//   $a=str_replace ("href=\"data", "href=\"/data", $row["content"]);
   $a=$mysqli->real_escape_string ($a); //$row["title"]);

   $q="UPDATE contents SET introText='".$a."', slug='222' WHERE id=".$row["id"];

//   echo $a."\n".$q."\n";
/*
   foreach($a as $id => $value)
     {
      echo $row["id"]." - ".$value."<br/>\n";;
      $mysqli->query("INSERT INTO publications_tags (`publication_id`, `tag_id`) VALUES ('".$row["id"]."', '".$value."');");
     }
*/

  $mysqli->query($q);

  echo $row["id"]."\n";
/*
   if ($row["metaIdList"])
     {
      $mets=explode(";", $row["metaIdList"]);
      var_dump ($mets);
      echo "<br/>\n";
      foreach ($mets as $met)
        {
         $mysqli->query("INSERT INTO `laravel`.`astr_pub_meta` (`pub_id`, `meta_id`) VALUES ('".$row["contentId"]."', '".$met."');");
        }

     }
*/

  }

/*
if ($row=$result->fetch_assoc ())
  {
   XMLCreateAttr ($doc, $Video, "id",    $row["Id"]);
   XMLCreateAttr ($doc, $Video, "title", $row["Title"]);
   XMLCreateAttr ($doc, $Video, "img",   $row["Image"]); //"data/~video/".sprintf ("%06d.jpg", $rnd));
  }


XMLCreateNode  ($doc, $FrameCenter, $LastPubList,  "LastPublicationsList");
$PubList=new PublicationsList (GROUP_ALL, 5);
$PubList->Load (SORT_BACKWARD, 1);
for ($i=0;$i<$PubList->Lenght;$i++)
  OutPublicationsListItem ($doc, $LastPubList, $PubList->Items[$i]);




//require ($DIR_Include."frame-left.php");
//require ($DIR_Include."frame-right.php");



XMLCreateNode ($doc, $FrameCenter, $RecentTopics, "RecentTopics");


foreach ($SMF_RecentTopics as $top)
  {
   XMLCreateNode ($doc, $RecentTopics, $Topic, "Topic");

   XMLCreateAttr ($doc, $Topic, "id",          $top["topic"]);
   XMLCreateAttr ($doc, $Topic, "subject",     htmlspecialchars_decode($top["subject"]));
   XMLCreateAttr ($doc, $Topic, "time",        date ("d.m.Y H:i:s", $top["timestamp"]));
   XMLCreateAttr ($doc, $Topic, "href",        $top["href"]);

   XMLCreateAttr ($doc, $Topic, "board_id",    $top["board"]["id"]);
   XMLCreateAttr ($doc, $Topic, "board_name",  $top["board"]["name"]);
   XMLCreateAttr ($doc, $Topic, "board_href",  $top["board"]["href"]);

   XMLCreateAttr ($doc, $Topic, "poster_id",   $top["poster"]["id"]);
   XMLCreateAttr ($doc, $Topic, "poster_name", $top["poster"]["name"]);
   XMLCreateAttr ($doc, $Topic, "poster_href", $top["poster"]["href"]);
  }


*/

