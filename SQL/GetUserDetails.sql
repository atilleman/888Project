USE [888Proj]
GO
/****** Object:  StoredProcedure [dbo].[usp_Get_User_Details]    Script Date: 5/12/2022 12:45:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[usp_Get_User_Details](@UserID int)
	
AS

	SET NOCOUNT ON;

	SELECT FirstName, LastName, UserName, DOB FROM Users
	WHERE ID = @UserID 