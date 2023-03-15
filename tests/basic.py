#!/usr/bin/python3

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


driver_location = "/usr/share/chromedriver"
binary_location = "/usr/bin/google-chrome"

# options = webdriver.ChromeOptions()
# options.binary_location = binary_location


# Set up the Chrome driver
service = Service(driver_location)
driver = webdriver.Chrome(service=service)

# https://www.youtube.com/watch?v=67h3IT2lm40

# Navigate to the webpage
url = "https://www.glassdoor.com/job-listing/cyber-security-practitioners-communications-security-establishment-JV_IC2278756_KO0,28_KE29,66.htm?jl=1008417772095&pos=102&ao=1110586&s=58&guid=00000186dc7940d18e8c680e0fd61aad&src=GD_JOB_AD&t=SR&vt=w&cs=1_72abd264&cb=1678736179817&jobListingId=1008417772095&cpc=022796DF6CE1C9E6&jrtk=3-0-1gre7ig7epkcs801-1gre7ig8cgfr2800-7660aebfc4278e1f--6NYlbfkN0BZ6P-xSY4_PG3nun9jwOJQH0Mg2Bx4wEvA-mwaiHtxQ3nYFzQl6ZApfyT4FQl2ENpPCPvF-EAEUDZN6Xqkni-s8SX_jf8I5cgRgyI0xwqYw31fz9eR62gURQEg5p9MVSfiHGoAczjOnbZwnQMlj97Dfw9wE6YIiq4tdn9TurfQmDYvWnZEaR6gQnqk5vxPY37r0WGQ6M64Hx2K4NkttEDd_zT_aid3Z-bFHyx2-NrkDEFGQ0dvkIXrUTALdkUA5cSazCONyPMCLn-x2yEexgg6Tj2mMpI_l1pQ_nBsa16uE4CZ89hikD1H_FTIwmIhtobbohLEGqpxecHpkxC2cA0G4N2gd0owfHF_6ai_5wQf-6PYa1GRqA3D9gHIkB1v3bTYMqoufGzdSEVHQoP8o7Z-PcmlMt-NXvMTM4qT6yoLXdOISVsNkfixy3SIu00ZoYO0k22i8SnTELfw9Q6-OmK_b3NStaRxEonQEhCr_ytOTZJuxut5_ljEuuvOlBtBhxuCP9I6RZriQTn98L_9X9X7xxY91bUPAXyTm7_gQ1YlPF8zHKfPmd9L0YgMRXry3h0%253D&ctt=1678737425757"

try:
  driver.get(url)
  print(driver.page_source.encode('utf-8'))
  driver.close()
  driver.quit()
  # //*[@id="PageContent"]/div[1]/div[2]/header/div/div/div[2]/span

# Wait for the page to load
except TimeoutException:
    print("Timed out waiting for page to load")

finally:
    # Close the browser window
    driver.quit()