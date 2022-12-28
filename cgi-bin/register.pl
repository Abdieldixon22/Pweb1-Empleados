#!C:/xampp/perl/bin/perl

use strict;
use warnings;
use CGI;
use DBI;

my $user = 'alumno';
my $password = 'pweb1';
my $dsn = "DBI:mysql:database=pweb1;host=192.168.0.16";
my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

my $sent = $dbh->prepare("INSERT INTO empleados(dni,firstName,lastName,salario) VALUES (?,?,?,?)");

my $q = CGI->new();

my $dni = $q->param('dni');
my $firstN = $q->param('firstN');
my $lastN = $q->param('lastN');
my $salary = $q->param('salary');

print $q->header('text/XML');

if($sent->execute($dni,$firstN,$lastN,$salary)) {
    $sent = $dbh->prepare("SELECT idEmp, firstName, lastName, dni, salario FROM empleados WHERE dni=".$dni);
    $sent->execute();

    my $xml =   "<?xml version='1.0' encoding='UTF-8'?>\n".
                "   <employees>\n".
                "       <status>OK</status>\n";

    while(my @row = $sent->fetchrow_array) {
        $xml = $xml . "<employee>\n".
                  "     <idEmp>$row[0]</idEmp>\n".
                  "     <firstName>$row[1]</firstName>\n".
                  "     <lastName>$row[2]</lastName>\n".
                  "     <dni>$row[3]</dni>\n".
                  "     <salary>$row[4]</salary>\n".
                  "</employee>\n";
    }
    $xml = $xml . "</employees>";

    print $xml;
}else {
    print       "<?xml version='1.0' encoding='UTF-8'?>\n".
                "   <employees>\n".
                "       <status>NO</status>".
                "   </employees>";
}

$sent->finish;
$dbh->disconnect;