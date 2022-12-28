#!C:/xampp/perl/bin/perl

use strict;
use warnings;
use CGI;
use DBI;

my $user = 'alumno';
my $password = 'pweb1';
my $dsn = "DBI:mysql:database=pweb1;host=192.168.0.16";
my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

my $sent = $dbh->prepare("SELECT firstName, lastName, dni, salary FROM empleados");

$sent->execute();

my $xml =   "<?xml version='1.0' encoding='UTF-8'?>\n".
            "   <employees>\n";

while(my @row = $sent->fetchrow_array) {
    $xml = $xml . "<employee>\n".
                  "     <firstName>$row[0]</firstName>\n".
                  "     <lastName>$row[1]</lastName>\n".
                  "     <dni>$row[2]</dni>\n".
                  "     <salary>$row[3]</salary>\n".
                  "<employee>\n";
}

$xml = $xml."   </employees>";

print $xml;