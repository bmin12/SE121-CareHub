import React, { useState, useEffect } from 'react';
import LoginImage from "../../assets/Login_image.png";
import VerifyTokenForm from '../../components/auth/VerifyTokenForm';

const VerifyTokenPage: React.FC = () => {
    return (
        <div className="min-w-[600px] w-full h-screen flex flex-row bg-[#f0f0f0]">
      <div style={{ backgroundImage: `url(${LoginImage})` }} className="image w-[45%] bg-no-repeat bg-contain">
      </div>
      <div className="w-[50%] pt-[120px] mx-auto ml-[-30px]">
        <VerifyTokenForm />
      </div>
    </div>
    );
};

export default VerifyTokenPage;