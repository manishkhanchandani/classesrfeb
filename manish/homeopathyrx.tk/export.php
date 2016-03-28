<?php
class ExportToExcel
{
  function xlsBOF() {
		return pack("ssssss", 0x809, 0x8, 0x0, 0x10, 0x0, 0x0);
	}

	function xlsEOF() {
		return pack("ss", 0x0A, 0x00);
	}

	function xlsWriteNumber($Row, $Col, $Value) {
		$x = pack("sssss", 0x203, 14, $Row, $Col, 0x0);
		$x .= pack("d", $Value);
		return $x;
	}

	function xlsWriteLabel($Row, $Col, $Value ) {
		$L = strlen($Value);
		$x = pack("ssssss", 0x204, 8 + $L, $Row, $Col, 0x0, $L);
		$x .= $Value;
		return $x;
	}
  
  function createOutput()
  {
    $output = $this->xlsBOF();
		$output .= $this->xlsWriteLabel(0, 0, 'Shaklee ID');
		$output .= $this->xlsWriteLabel(0, 1, 'Prize Description');
    $output .= $this->xlsEOF();
		return $output; 
  }
}
header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment;Filename=savedHomeopathyProfiles.xls");
$export = new ExportToExcel();
$output = $export->createOutput();
echo $output;
?>