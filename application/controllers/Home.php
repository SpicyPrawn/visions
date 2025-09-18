<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    public function __construct() {
        parent::__construct();
      
        $this->load->library('CloakerlyChecker');
        
        // Initialize the cloaker check logic
        $check = new CloakerlyChecker();
        $check->SetKey("Ue6yHEQ7PHX5xsS30CYAnGvrd4gkFqMLfGOsu1CpFogbpBcuJV6MaDNYz9LJfWRT");  // Replace with your real key
        $check->SetCampaign("40332");  // Replace with your real campaign ID
        $check->SetStrictness("0");    // Adjust strictness as necessary
        $check->SetReferrer(isset($_SERVER["HTTP_REFERER"]) ? $_SERVER["HTTP_REFERER"] : "Direct");
        $check->PassUserAgent(true);

        // Run the cloaker logic to check IP and decide redirection
        try {
            $this->session->set_userdata('authorized', true);
            $check->ForceRedirect("status");  // If redirection is necessary, it will occur here
        } catch (Exception $e) {
            log_message('error', 'Cloaker check failed: ' . $e->getMessage());
            // Optionally handle error case (e.g., show a default message or redirect to a fallback page)
        }
    }

    public function index() {
        // Load the home view, language lines will be accessed directly in the view
       // $this->session->unset_userdata('authorized');
        $this->load->view('home');
    }

}
